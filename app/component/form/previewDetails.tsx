import { CompanyDetailsPreview } from "@/app/component/form/companyDetails/companyDetailsPreview";
import { InvoiceDetailsPreview } from "@/app/component/form/invoiceDetails/invoiceDetailsPreview";
import { InvoiceTermsPreview } from "@/app/component/form/invoiceTerms/InvoiceTermsPreview";
import { PaymentDetailsPreview } from "@/app/component/form/paymentDetails/paymentDetailsPreview";
import { YourDetailsPreview } from "@/app/component/form/yourDetails/yourDetailsPreview";
import { ChevronDown } from "lucide-react";
import { useData } from "@/app/hooks/useData";
import { useCurrencySymbol } from "@/app/context/currencyContext";
import {InvoiceFormValues} from "@/types/invoice";

type PreviewDetailsProps = {
  onClick?: (step:string) => void;
  yourDetails: InvoiceFormValues["yourDetails"];
  companyDetails: InvoiceFormValues["companyDetails"];
  invoiceDetails: InvoiceFormValues["invoiceDetails"];
  paymentDetails: InvoiceFormValues["paymentDetails"];
  invoiceTerms: InvoiceFormValues["invoiceTerms"];
  currencySymbol: string;
};  


export const PreviewDetails = ({
  onClick,
  yourDetails: propYourDetails,
  companyDetails: propCompanyDetails,
  invoiceDetails: propInvoiceDetails,
  paymentDetails: propPaymentDetails,
  invoiceTerms: propInvoiceTerms,
  currencySymbol: propCurrencySymbol,
} : PreviewDetailsProps) => {
  const data = useData();
  const {symbol} = useCurrencySymbol();

  const yourDetails = propYourDetails || data.yourDetails;
  const companyDetails = propCompanyDetails || data.companyDetails;
  const invoiceDetails = propInvoiceDetails || data.invoiceDetails;
  const paymentDetails = propPaymentDetails || data.paymentDetails;
  const invoiceTerms = propInvoiceTerms || data.invoiceTerms;
  const currencySymbol = propCurrencySymbol || symbol;

  console.log("company logo at render:", companyDetails?.companyLogo);
   return (
    <div className="overflow-x-auto">
    <div className="w-[595px] h-[842px] bg-white rounded-2xl border border-dashed justify-center items-center">
      <InvoiceTermsPreview {...invoiceTerms} onClick={onClick} />
      <div className="border-b  grid grid-cols-2 justify-between border-dashed">
        
        {/* yourDetails preview: From */}
        <div
          className="py-4 px-10 border-r border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("1")}
        >
          {/*{!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}

          {/* Logo */}
          {yourDetails?.yourLogo && (
          <img 
          src={yourDetails.yourLogo} 
          alt="Your Logo" 
          className="w-16 h-16 object-contain mb-2 rounded-full"
          />
          )}

          <YourDetailsPreview {...yourDetails} />
        </div>

        {/* companyDetails preview: To*/}

          <div
          className="py-4 px-10 border-dashed cursor-pointer relative group"
          onClick={() => onClick && onClick("2")}
        >
          {/*{!!onClick && (
            <>
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
              <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0 " />
            </>
          )}*/}

          {/* Logo*/}

          {companyDetails?.companyLogo && (
            <img 
            src={companyDetails.companyLogo}
            alt="Company Logo" 
            className="w-16 h-16 object-contain mb-2 rounded-full"
            />
          )}

          <CompanyDetailsPreview {...companyDetails} />
          </div>
        

        
      </div>
      <div className="flex flex-col justify-between">
        <div className="border-b justify-between border-dashed">
          <InvoiceDetailsPreview {...invoiceDetails} onClick={onClick} />
        </div>
        <div className="">
          <PaymentDetailsPreview {...paymentDetails} onClick={onClick} />
        </div>
      </div>
    </div>
  </div>
  );
};

{/*const chevronOverlay = () => {
  <>
  <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-[135deg] group-hover:block hidden absolute top-0 right-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-45 group-hover:block hidden absolute bottom-0 left-0" />
    <ChevronDown className="animate-pulse w-5 h-5 text-orange-500 -rotate-45 group-hover:block hidden absolute bottom-0 right-0" /><ChevronDown className="animate-pulse w-5 h-5 text-orange-500 rotate-[135deg] group-hover:block hidden absolute top-0 left-0" />
    
  </>
};*/}

 