
const handleDownload = async ({
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
}: {
    companyDetails: any;
    invoiceDetails: any;
    invoiceTerms: any;
    paymentDetails: any;
    yourDetails: any;
}) : Promise<string | null>  => {
    console.log("Sending to backend:", {
            companyDetails,
            invoiceDetails,
            invoiceTerms,
            paymentDetails,
            yourDetails,
        });

        console.log("Debug Company Details:", companyDetails);
        console.log("Debug Your Details:", yourDetails);
        console.log("Debug Invoice Details:", invoiceDetails);
        
         if (!companyDetails?.companyName || !yourDetails?.yourName || !invoiceDetails?.items ||invoiceDetails.items.length === 0) {
            console.error ("Missing Invoice Data:  cannot proceed with download");
            return null;
        }

    try {
        const response = await fetch("/api/downloadInvoice", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                companyDetails,
                invoiceDetails,
                invoiceTerms,
                paymentDetails,
                yourDetails,
            }),
        });

        if (response.ok) {
            const invoiceId = response.headers.get("x-invoice-id");
            console.log("Inserted Invoice ID:", invoiceId);

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "invoices.pdf";
            link.click();
            window.URL.revokeObjectURL(url);

            return invoiceId;
        }
        else {
            const errorText = await response.text();
            console.error("Download Failed:", response.status, errorText);
            return null;
        }
    }

    catch (error) {
        console.error("Download Error:", error);
        return null;
    }
};

export default handleDownload;