import { InvoiceFormValues } from "@/types/invoice";

export const defaultValues: InvoiceFormValues = {
    companyDetails: {
        companyName: "",
        companyAddress: "",
        companyCity: "",
        companyState: "",
        companyCountry: "",
        companyLogo: "",
        companyTaxID: "",
        companyZip: "",
        email: "",
    },

    yourDetails: {
        yourName: "",
        yourAddress: "",
        yourCity: "",
        yourState: "",
        yourCountry: "",
        yourLogo: "",
        yourEmail: "",
        yourTaxId: "",
        yourZip: "",
    },

    invoiceDetails: {
        note: "",
        discount: "",
        taxRate: "",
        items: [],
        currency: "AED",
    },

    paymentDetails: {
        bankName: "",
        accountNumber: "",
        accountName: "",
        routingCode: "",
        swiftCode: "",
        ifscCode: "",
        currency: "AED",
    },

    invoiceTerms: {
        invoiceNumber: "",
        issueDate: "",
        dueDate: "",
    },
}