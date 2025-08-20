"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, Download, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import EmailInvoiceButton from './EmailInvoiceButton';
import handleDownload from "@/lib/handleDownload"; // default import

interface DownloadInvoiceButtonProps{
  companyDetails: any;
  invoiceDetails: any;
  invoiceTerms: any;
  paymentDetails: any,
  yourDetails: any,
  userEmail?: string;   // add optional userEmail
  onGenerateAndDownload?: () => void;
}

export default function DownloadInvoiceButton ( {
  companyDetails,
    invoiceDetails,
    invoiceTerms,
    paymentDetails,
    yourDetails,
    userEmail,
    onGenerateAndDownload,
  }: DownloadInvoiceButtonProps) {
    const [status, setStatus] = useState<
    "downloaded" | "downloading" | "not-downloaded"
  >("not-downloaded");

  useEffect(() => {
    if (status === "downloaded") {
      setTimeout(() => {
        setStatus("not-downloaded");
      }, 1000);
    }
  }, [status]);

  const onClickDownload = async () => {
    setStatus("downloading");

    try {
      await handleDownload({
        companyDetails,
        invoiceDetails,
        invoiceTerms,
        paymentDetails,
        yourDetails,
        userEmail: userEmail || yourDetails.yourEmail,
      });
      setStatus("downloaded");

      if (onGenerateAndDownload) {
        onGenerateAndDownload();
      }
  }
  catch (error) {
      console.error("Download error:", error);
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
          onClick={onClickDownload}
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
              <LoaderIcon className="mr-2 h-6 w-6 animate-spin" />
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