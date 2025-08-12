"use client";
import { PreviewDetails } from "@/app/component/form/previewDetails";
/*import { useData } from "@/app/hooks/useData";*/
import { useFormContext } from "react-hook-form";
import { useCurrencySymbol } from "@/app/context/currencyContext";
import { InvoiceFormValues } from "@/types/invoice";

export const UserDataPreview = () => {
  const {watch, setValue} = useFormContext<InvoiceFormValues>();


  const companyDetails = watch("companyDetails");
  const invoiceDetails = watch("invoiceDetails");
  const invoiceTerms = watch("invoiceTerms");
  const paymentDetails = watch("paymentDetails");
  const yourDetails = watch("yourDetails");

  /*const { setValue } = useFormContext();*/
  const {symbol} = useCurrencySymbol();

  const onClick = (step: string) => {
    setValue("step" as any, step);
    localStorage.setItem("step", step);
  };
  

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
