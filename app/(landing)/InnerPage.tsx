"use client";

import {useData} from "@/app/hooks/useData";
import handleDownload  from "@/app/component/form/downloadInvoice/downloadInvoiceButton";

export default function InnerPage() {
    const {
        companyDetails,
        yourDetails,
        paymentDetails,
        invoiceTerms,
        invoiceDetails,
    } = useData();

    return (
        <div className="p-6">
      <button
        onClick={() =>
          handleDownload({
            companyDetails,
            yourDetails,
            paymentDetails,
            invoiceTerms,
            invoiceDetails
          })
        }
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Download Invoice
      </button>
    </div>
    );
}