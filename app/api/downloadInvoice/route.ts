import path from "path";
import clientPromise from '@/lib/mongodb';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import { streamToBuffer } from "@/lib/streamToBuffer";
import fs from "fs";
import { parse } from 'cookie';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Incoming request body:", body);
        const {
            companyDetails,
            invoiceDetails, 
            invoiceTerms,
            paymentDetails,
            yourDetails
        } = body;

        if (!body.companyDetails?.companyName ||
            !body.yourDetails?.yourName || 
            !body.invoiceDetails?.items?.length
        ) {
            console.error("Received incomplete data:", body);
            return new Response("Invalid Invoice Data", {status:400});
        }

        const client = await clientPromise;
        const db = client.db('testData');

        const cookieHeader = request.headers.get('cookie');
        const cookiesobj = cookieHeader ? parse(cookieHeader) : {};
        const userEmail = cookiesobj['userEmail'];

        if (!userEmail) {
            return new Response("unauthorized: No user Email found in cookies", { status: 401 });
        }

        console.log("User email from cookie:", userEmail);

        const user = await db.collection('users').findOne({ email: userEmail });

        if (!user || !Array.isArray(user.payments) || user.payments.length === 0) {
            return new Response('No invoices found', { status: 404 });
        }

        // save invoice to MONgoDB
        const paymentData = {
            paymentId: invoiceTerms.invoiceNumber,
            amount: invoiceDetails.items.reduce((acc: any, item: any) => acc + (item.amount || 0), 0),
            date: new Date(),
            companyDetails,
            invoiceDetails,
            invoiceTerms,
            paymentDetails,
            yourDetails
        };

        await db.collection("users").updateOne(
            { email: userEmail },
            {
                $push: {
                    payments: {
                        paymentId: invoiceTerms.invoiceNumber,
                        amount: invoiceDetails.items.reduce(
                            (acc: any, item: any) => acc + (item.amount || 0),
                            0
                        ),
                        discountAmount: Number(invoiceDetails.discount || 0),
                        date: new Date(),
                        companyDetails,
                        invoiceDetails,
                        invoiceTerms,
                        paymentDetails,
                        yourDetails
                    }
                } as any
            }
        );

        const fontPath = (name: string) => path.resolve("./public/font", name);
        const regularFont = fontPath("Geist-Regular.ttf");
        const boldFont = fontPath("Geist-Bold.ttf");

        if (!fs.existsSync(regularFont) || !fs.existsSync(boldFont)) {
            return new Response("Font Files Missing", { status: 500 });
        }

        // create document after fonts are confirmed available
        const doc = new PDFDocument({
            margin: 50,
            font: regularFont
        });
        const stream = new PassThrough();

        // register fonts and set before writing/streaming
        doc.registerFont("Geist-Regular", regularFont);
        doc.registerFont("Geist-Bold", boldFont);
        doc.font("Geist-Regular");
        doc.pipe(stream);

        // Header
        const formatCurrency = (value: number) => `\$${value.toLocaleString()}`;
        doc.font("Geist-Bold").fontSize(20).text("INVOICE", { align: "center" });
        doc.moveDown(1);

        doc.fontSize(10).font("Geist-Regular");
        doc.text(`Invoice No: ${invoiceTerms.invoiceNumber}`, { align: "left" });
        doc.text(`Issued: ${new Date(invoiceTerms.issueDate).toDateString()}`, { align: "left" });
        doc.text(`Due: ${new Date(invoiceTerms.dueDate).toDateString()}`, { align: "left" });
        doc.moveDown();

        // From/To Details: 
        const startY = doc.y;

        // From:
        const fromX = 50;
        const toX = 300;

        doc.font("Geist-Bold").text("FROM", fromX, startY);
        doc.font("Geist-Regular").text(`${yourDetails.yourName}`, fromX);
        doc.text(`${yourDetails.yourEmail}`, fromX);
        doc.text(`${yourDetails.yourAddress}`, fromX);
        doc.text(`${yourDetails.yourCity}, ${yourDetails.yourState} ${yourDetails.yourZip}`, fromX);
        doc.text(`${yourDetails.yourCountry}`, fromX);
        doc.text(`Tax ID: ${yourDetails.yourTaxId || '-'}`, fromX);

                // To:
                doc.font("Geist-Bold").text("To", toX, startY);
                doc.font("Geist-Regular").text(`${companyDetails.companyName}`, toX);
                doc.text(`${companyDetails.email}`, toX);
                doc.text(`${companyDetails.companyAddress}`, toX);
                doc.text(`${companyDetails.companyCity}, ${companyDetails.companyState}, ${companyDetails.companyZip}`, toX);
                doc.text(`${companyDetails.companyCountry}`, toX);
                doc.text(`Tax ID: ${companyDetails.companyTaxID || '-'}`, toX);
                doc.moveDown();

        // Line Break
        const pageWidth = doc.page.width;
        doc.moveTo(50, doc.y).lineTo(pageWidth - 50, doc.y).stroke();
        doc.moveDown();

        // Items Table Header
        const itemStartY = doc.y;
        doc.font("Geist-Bold");
        doc.text("DESCRIPTION", 50, itemStartY);
        doc.text("QTY", 300, itemStartY);
        doc.text("PRICE", 360, itemStartY);
        doc.text("AMOUNT", 440, itemStartY);

        doc.moveDown();
        doc.font("Geist-Regular");

        invoiceDetails.items.forEach((item: any) => {
            const y = doc.y;
            doc.text(item.description, 50, y);
            doc.text(item.qty?.toString() || "1", 300, y);
            doc.text(item.price?.toLocaleString() || "0", 360, y);
            const amount = (item.qty || 0) * (item.pice || 0)
            doc.text(amount.toLocaleString(), 440, y);
        });

        doc.moveDown();

        // NOTE
        if (invoiceDetails.note) {
            doc.font("Geist-Regular").fontSize(10).text("Note", { underline: true });
            doc.text(invoiceDetails.note);
            doc.moveDown();
        }


        // TOTALS
        const subtotal = invoiceDetails.items.reduce((acc: any, item: any) => {
            return acc + ((item.qty || 0) * (item.price || 0));
        }, 0);
        const discount = parseFloat(invoiceDetails.discount || "0");
        const taxRate = parseFloat(invoiceDetails.taxRate || "0");
        const taxedAmount = ((subtotal - discount) * taxRate) / 100;
        const total = subtotal - discount + taxedAmount;

        doc.font("Geist-Bold");
        doc.text(`Subtotal`, 360, doc.y, { continued: true }).text(`${formatCurrency(subtotal)}`, 460);
        doc.text(`Discount`, 360, doc.y, { continued: true }).text(`-${formatCurrency(discount)}`, 460);
        doc.text(`Tax (${taxRate}%)`, 360, doc.y, { continued: true }).text(`${formatCurrency(taxedAmount)}`, 460);
        doc.text(`Total`, 360, doc.y, { continued: true }).text(`${formatCurrency(total)}`, 460);

        doc.moveDown(2);


        // BANK DETAILS & PAYABLE IN
        const bankY = doc.y;
        doc.font("Geist-Bold").text("BANK DETAILS", 50, bankY);
        doc.font("Geist-Regular").text(`Bank Name: ${paymentDetails.bankName}`, 50);
        doc.text(`Account Number: ${paymentDetails.accountNumber}`, 50);
        doc.text(`Account Name: ${paymentDetails.accountName}`, 50);
        doc.text(`Swift Code: ${paymentDetails.swiftCode}`, 50);
        doc.text(`Routing Code: ${paymentDetails.routingCode}`, 50);
        doc.text(`IFSC Code: ${paymentDetails.ifscCode}`, 50);

        doc.font("Geist-Bold").text("PAYABLE IN", 360, bankY);
        doc.font("Geist-Regular").text(`${paymentDetails.paymentCurrency}`, 360);
        doc.text(`${paymentDetails.paymentSymbol}`, 360);

        doc.end();

        const PDFbuffer = await streamToBuffer(stream);

        const invoiceInsertResult = await db.collection("invoices").insertOne({
            companyDetails,
            invoiceDetails,
            invoiceTerms,
            paymentDetails,
            yourDetails,
            createdAt: new Date(),
            userEmail,
        });

        console.log("pdf generated and sending responses");
        return new Response(PDFbuffer, {
    status: 200,
    headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=invoice.pdf',
        'x-invoice-id': invoiceInsertResult.insertedId.toString(),
    },
});
    }

    catch (error) {
        console.error('Download Invoice PDF Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
