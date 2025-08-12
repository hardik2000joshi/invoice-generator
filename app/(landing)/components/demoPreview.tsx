"use client";
import {PreviewDetails} from "@/app/component/form/previewDetails";
import { useCurrencySymbol } from "@/app/context/currencyContext";
import { useFormContext } from "react-hook-form";
import { InvoiceFormValues } from "@/types/invoice";


const DemoPreview = () => {

  const {watch} = useFormContext<InvoiceFormValues>();
  
  const companyDetails = watch("companyDetails");
  const yourDetails = watch("yourDetails");
  const invoiceDetails = watch("invoiceDetails");
  const paymentDetails = watch ("paymentDetails");
  const invoiceTerms = watch("invoiceTerms");
  
  const {symbol} = useCurrencySymbol();


  return (

  <div className="mx-auto w-full flex justify-center items-center">
    <PreviewDetails
    yourDetails={yourDetails}
    companyDetails={companyDetails}
    invoiceDetails={invoiceDetails}
    paymentDetails={paymentDetails}
    invoiceTerms={invoiceTerms}
    currencySymbol={symbol}
    />
  </div>
);
};

/*const defaultValue = {
  companyDetails: {
    companyName: "Nestle",
    companyAddress: "1600 Amphitheatre Parkway",
    companyCity: "Mountain View",
    companyState: "CA",
    companyCountry: "USA",
    companyLogo: "https://1000logos.net/wp-content/uploads/2017/03/Nestle-Logo.png",
    companyTaxID: "",
    companyZip: "94043",
    email: "accounts.payable@nestle-demo.com",
  },  
  yourDetails: {
    yourName: "Deep Marketing Pvt Ltd",
    yourAddress: "6th Main Rd, Eshwara Layout, Indiranagar,",
    yourCity: "Bengaluru",
    yourState: "Karnataka",
    yourCountry: "India",
    yourLogo: "/deep_logo.png",   
    yourEmail: "hi@deepMarketing123abc",
    yourTaxId: "",
    yourZip: "560038",
  },
  paymentDetails: {
    bankName: "Axis Bank",
    accountNumber: "1234567890",
    accountName: "Deep Marketing",
    routingCode: "123456",
    swiftCode: "AXISINBB1234",
    ifscCode: "UTIB0000000",
    currency: "AED",
  },
  invoiceTerms: {
    invoiceNumber: "Invoice #25",
    issueDate: "Fri Apr 19 2024 00:00:00 GMT+0530 (India Standard Time)",
    dueDate: "Mon Apr 22 2024 00:00:00 GMT+0530 (India Standard Time)",
  },
  invoiceDetails: {
    note: "Services Period  21/03/2024 to 20/04/2024",
    discount: "22000",
    taxRate: "18",
    items: [
      {
        itemDescription: "Software Development Services",
        amount: 225000,
        qty: 0,
      },
      {
        itemDescription: "Hosting Charge",
        amount: 22000,
        qty: 0,
      },
    ],
    currency: "AED",
  },
};*/


export default DemoPreview;                                         