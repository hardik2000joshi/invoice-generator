
export const handleDownload = async ({
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
}) => {
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
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "invoices.pdf";
            link.click();
            window.URL.revokeObjectURL(url);
        }
        else {
            const errorText = await response.text();
            console.error("Download Failed:", response.status, errorText);
        }
    }

    catch (error) {
        console.error("Download Error:", error);
    }
};