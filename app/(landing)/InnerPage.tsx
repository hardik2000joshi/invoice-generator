'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import  DownloadInvoiceButton  from '@/app/component/form/downloadInvoice/downloadInvoiceButton';
interface InnerPageProps {
    onGenerateAndDownload : () => void;
}

export default function InnerPage({onGenerateAndDownload} : InnerPageProps) {
    const { control } = useFormContext();

    const companyDetails = useWatch({ control, name: "companyDetails" });
    const yourDetails = useWatch({ control, name: "yourDetails" });
    const invoiceDetails = useWatch({ control, name: "invoiceDetails" });
    const paymentDetails = useWatch({ control, name: "paymentDetails" });
    const invoiceTerms = useWatch({ control, name: "invoiceTerms" });
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold'>
                Invoice Preview
            </h1>

            <p className='mt-4'>
                <strong>
                    Company Name:
                </strong>
                {companyDetails?.companyName}
            </p>

            <p>
                <strong>
                    yourName:
                </strong>
                {yourDetails?.yourName}
            </p>

            <p>
                <strong>
                    Note:
                </strong>
                {invoiceDetails?.note}
            </p>

            <p>
                <strong>
                    Bank:
                </strong>
                {paymentDetails?.bankName}
            </p>

            <DownloadInvoiceButton
            companyDetails={companyDetails}
            invoiceDetails={invoiceDetails}
            invoiceTerms={invoiceTerms}
            paymentDetails={paymentDetails}
            yourDetails={yourDetails}
                onGenerateAndDownload={onGenerateAndDownload}
            />
        </div>


    );
}