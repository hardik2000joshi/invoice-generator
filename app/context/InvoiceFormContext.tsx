"use client";

import { ReactNode, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { defaultValues } from "@/lib/defaultValues";
import { InvoiceFormValues } from "@/types/invoice";
export const InvoiceFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<InvoiceFormValues>({
    defaultValues,
    mode: "onChange",
  });

  // to avoid hydration mismatch
  useEffect(() => {
    const saved = localStorage.getItem("invoiceData");
    if (saved) {
      methods.reset(JSON.parse(saved));
    }
  }, [methods]);

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};


