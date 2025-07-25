"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, LoaderIcon, SplineIcon } from "lucide-react";
import { PdfDetails } from "../pdfDetails";
import { useData } from "@/app/hooks/useData";
import { pdfContainers } from "@/lib/pdfStyles";
import { saveAs } from "file-saver";
import { svgToDataUri } from "@/lib/svgToDataUri";
import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currency";
import EmailInvoiceButton from './EmailInvoiceButton';

export const DownloadInvoiceButton = () => {
  const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");
  const {
    companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
  } = useData();

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 1000);
    }
  }, [status]);

  const handleDownload = async () => {
    setStatus("downloading");

    try {
      const response = await fetch("/api/downloadInvoice", {
        method: "POST",
        credentials: 'include',
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "invoices.pdf";
        link.click();
        window.URL.revokeObjectURL(url);
        setStatus("downloaded");
      }
      else {
        console.error("Download Failed");
        setStatus("not-downloaded");
      }
    }

    catch(error) {
      console.error("Download Error:", error);
      setStatus("not-downloaded");
    }
  };

  return (
    <div className="flex h-[calc(100vh-208px)] justify-center items-center">
      <div>
        <h1 className="text-5xl font-semibold pb-6">Your invoice is ready</h1>
        <p className="text-neutral-500 text-xl pb-7">
          Please review the details carefully before downloading your invoice.
        </p>
        <Button
          disabled={status === "downloading"}
          onClick= {handleDownload}
          type="button"
          className="w-full h-12 rounded-lg text-lg"
        >
          {status === "not-downloaded" && (
            <>
              <Download className="mr-2 h-6 w-6" /> Download Invoice
            </>
          )}
          {status === "downloading" && (
            <>
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />{" "}
              Downloading...
            </>
          )}
          {status === "downloaded" && (
            <>
              <CheckCircle2 className="mr-2 h-6 w-6" /> Downloaded
            </>
          )}
        </Button>
            <EmailInvoiceButton />
      </div>
    </div>
  );
};