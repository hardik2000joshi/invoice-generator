export type InvoiceItem = {
    description: string;
    qty: number;
    price: number;
};

export type InvoiceFormValues = {
    companyDetails: {
        companyName: string;
        companyAddress: string;
        companyCity: string;
        companyState: string;
        companyCountry: string;
        companyLogo: string;
        companyTaxID: string;
        companyZip: string;
        email: string;
    };

    yourDetails: {
        yourName: string;
        yourAddress: string;
        yourCity: string;
        yourState: string;
        yourCountry: string;
        yourLogo: string;
        yourEmail: string;
        yourTaxId: string;
        yourZip: string;
    };
    invoiceDetails: {
        note: string;
        discount: string,
        taxRate: string,
        items: InvoiceItem[];
        currency: string,
    };

    paymentDetails: {
        bankName: string;
        accountNumber: string;
        accountName: string;
        routingCode: string;
        swiftCode: string;
        ifscCode: string;
        currency: string;
    };
    invoiceTerms: {
        invoiceNumber: string;
        issueDate: string;
        dueDate: string;
    };
};