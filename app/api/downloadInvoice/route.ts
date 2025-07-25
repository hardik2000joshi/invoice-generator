import path from "path";
import clientPromise from '@/lib/mongodb';
import PDFDocument from 'pdfkit';
import {PassThrough} from 'stream';
import { streamToBuffer } from "@/lib/streamToBuffer";
import fs from "fs";

export async function POST(req:Request) {
    try {
    const client = await clientPromise;
    const db = client.db('testData');

    const cookieHeader = req.headers.get('cookie');
    const userEmail = decodeURIComponent(cookieHeader?.split('userEmail=')[1]?.split(';')[0] || '');

    if (!userEmail) {
        return new Response("unauthorized: No user Email found in cookies", {status: 401});
    }

    const user = await db.collection('users').findOne({email: userEmail});

    if (!user || !Array.isArray(user.payments) || user.payments.length === 0) {
        return new Response('No invoices found', {status: 404});
    }

    const doc = new PDFDocument({margin: 50});
    const stream = new PassThrough();

    const fontPath = (name: string) => path.resolve("./public/font", name);
    const regularFont = fontPath("Geist-Regular.ttf");
    const boldFont = fontPath("Geist-Bold.ttf");

    if (!fs.existsSync(regularFont) || !fs.existsSync(boldFont)) {
        return new Response("Font Files Missing", {status: 500});
    }

    doc.registerFont("Geist-Regular", fontPath("Geist-Regular.ttf"));
    doc.registerFont("Geist-Bold", fontPath("Geist-Bold.ttf"));

    doc.pipe(stream);

    // pdf heading

    doc.font("Geist-Bold").fontSize(20).text(`Invoice Report for ${userEmail}`, {
        align: 'center',
        underline: true,
    });
    doc.moveDown();

    // pdf table header
    doc.font("Geist-Regular").fontSize(12).text("Invoice ID | Amount | Date");
    doc.moveDown(0.5);

    // pdf table content
    user.payments.forEach((payment) => {
        const id = payment.paymentId || 'N/A';
        const amount = payment.amount || '0';
        const date = payment.date ? new Date(payment.date).toISOString() : 'unknown';
        doc.text(`${id} | ${amount} | ${date}`);
    });

    doc.end();
    
    const PDFbuffer = await streamToBuffer(stream);

    return new Response(PDFbuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': "attachment; filename=invoices.pdf",
        },
    });
}
    catch (error) {
        console.error('Download Invoice PDF Error:', error);
        return new Response('Internal Server Error', {status: 500});
    }
}