"use client";
import { PreviewDetails } from "@/app/component/form/previewDetails";
import { useData } from "@/app/hooks/useData";
import { useFormContext } from "react-hook-form";
import { useCurrencySymbol } from "@/app/context/currencyContext";

export const UserDataPreview = () => {
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();
  const { setValue } = useFormContext();

  const onClick = (step: string) => {
    setValue("step", step);
    localStorage.setItem("step", step);
  };
  const {symbol} = useCurrencySymbol();

  return (
    <PreviewDetails
      onClick={onClick}
  yourDetails={yourDetails}
  companyDetails={companyDetails}
  invoiceDetails={invoiceDetails}
  paymentDetails={paymentDetails}
  invoiceTerms={invoiceTerms}
  currencySymbol={symbol}
    />
  );
};
