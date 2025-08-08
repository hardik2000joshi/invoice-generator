"use client";
import { useGetValue, useItemParams } from "@/app/hooks/useGetValue";
import { currencyList } from "@/lib/currency";
import { useFormContext } from "react-hook-form";
import { InvoiceFormValues } from "@/types/invoice";
import { useCurrencySymbol } from "../context/currencyContext";
const selectedCurrency = "USD";
const currencyMeta = currencyList.find(
  (c) => c.value === selectedCurrency
);

export const useData = () => {
  const { watch } = useFormContext<InvoiceFormValues>();

  const yourEmail = watch("yourDetails.yourEmail");
  const yourName = watch("yourDetails.yourName");
  const yourAddress = watch("yourDetails.yourAddress");
  const yourCity = watch("yourDetails.yourCity");
  const yourState = watch("yourDetails.yourState");
  const yourCountry = watch("yourDetails.yourCountry");
  const yourLogo = watch("yourDetails.yourLogo");
  const yourTaxId = watch("yourDetails.yourTaxId");
  const yourZip = watch("yourDetails.yourZip");

  const email = watch("companyDetails.email");
  const companyName = watch("companyDetails.companyName");
  const companyAddress = watch("companyDetails.companyAddress");
  const companyCity = watch("companyDetails.companyCity");
  const companyState = watch("companyDetails.companyState");
  const companyCountry = watch("companyDetails.companyCountry");
  const companyLogo = watch("companyDetails.companyLogo");
  const companyTaxID = watch("companyDetails.companyTaxID");
  const companyZip = watch("companyDetails.companyZip");

  const note = watch("invoiceDetails.note");
  const discount = watch("invoiceDetails.discount");
  const taxRate = watch("invoiceDetails.taxRate");
  const items = watch("invoiceDetails.items");

  const bankName = watch("paymentDetails.bankName");
  const accountNumber = watch("paymentDetails.accountNumber");
  const accountName = watch("paymentDetails.accountName");
  const routingCode = watch("paymentDetails.routingCode");
  const swiftCode = watch("paymentDetails.swiftCode");
  const ifscCode = watch("paymentDetails.ifscCode");

  const invoiceNumber = watch("invoiceTerms.invoiceNumber");
  const issueDate = watch("invoiceTerms.issueDate");
  const dueDate = watch("invoiceTerms.dueDate");

  const currency = watch("invoiceDetails.currency") || "AED";

  const currencyMeta = currencyList.find(
    (c) => c.value === currency
  );

  const invoiceTerms = {
    invoiceNumber,
    issueDate,
    dueDate,
  };

  const invoiceDetails = {
    note,
    discount,
    taxRate,
    items,
    currency,
  };

  const paymentDetails = {
    bankName: bankName,
    accountNumber: accountNumber,
    accountName: accountName,
    routingCode: routingCode,
    swiftCode: swiftCode,
    ifscCode: ifscCode,
    currency: currency,

    // Dynamically set the payment symbol based on selected currency
    paymentSymbol: currencyMeta?.details.currencySymbol || "$",

    // this is the key change 
    paymentCurrency: currencyMeta?.details.currencyName || "United States Dollar",
  };

  const yourDetails = {
    yourName,
    yourAddress,
    yourCity,
    yourState,
    yourCountry,
    yourLogo,
    yourEmail,
    yourTaxId,
    yourZip,
  };

  const companyDetails = {
    companyName,
    companyAddress,
    companyCity,
    companyState,
    companyCountry,
    companyLogo,
    companyTaxID,
    companyZip,
    email,
  };

  const {symbol} = useCurrencySymbol();

  return {
    companyDetails,
    yourDetails,
    paymentDetails,
    invoiceTerms,
    invoiceDetails,
    symbol
  };
};
