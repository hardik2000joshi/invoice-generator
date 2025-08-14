import { InvoiceFormValues } from "@/types/invoice";

export const defaultValues: InvoiceFormValues = {
    companyDetails: {
        companyName: "",
        companyAddress: "",
        companyCity: "",
        companyState: "",
        companyCountry: "",
        companyLogo: "/nestle.png",
        companyTaxID: "",
        companyZip: "",
        companyEmail: "",
    },

    yourDetails: {
        yourName: "",
        yourAddress: "",
        yourCity: "",
        yourState: "",
        yourCountry: "",
        yourLogo: "/deep-logo.png",
        yourEmail: "",
        yourTaxID: "",
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