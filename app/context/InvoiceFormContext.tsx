"use client";

import { ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { defaultValues } from "@/lib/defaultValues";
import { InvoiceFormValues } from "@/types/invoice";

export const InvoiceFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<InvoiceFormValues>({
    defaultValues,
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};


