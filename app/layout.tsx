import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import Script from "next/script";

function getValidURL(raw: string | undefined, fallback: string) {
  if (!raw || raw.trim() === "" || raw.trim() === "null" || raw.trim() === "undefined") {
    return fallback;
  }
  
  const value = raw.trim();
  try {
    new URL(value);
    return value;
  } catch {
    console.warn("Invalid NEXT_PUBLIC_URL, using fallback:", raw);
    return fallback;
  }
}

// Always returns a valid URL object
function getSafeURLObject(raw: string | undefined, fallback: string) {
  const safe = getValidURL(raw, fallback);
  try {
    return new URL(safe);
  } catch (e) {
    console.warn("Fallback triggered due to invalid URL:", safe, e);
    return new URL(fallback);
  }
}

const baseUrl = getValidURL(process.env.NEXT_PUBLIC_URL, "https://tedtools.com/");
console.log("DEBUG: process.env.NEXT_PUBLIC_URL =", process.env.NEXT_PUBLIC_URL);
console.log("DEBUG: baseUrl =", baseUrl);

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: getSafeURLObject(process.env.NEXT_PUBLIC_URL, "https://tedtools.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  title:
    "Free Invoice Generator: Create & Send Professional Invoices in Minutes",
  description:
    "Get paid on time with our free invoice maker. Create professional invoices & get them to clients instantly.",
  keywords: [
    "invoice generator",
    "free invoice template",
    "invoice maker",
    "online invoice",
    "create invoice",
  ],
  robots: "index, follow",
  openGraph: {
    title:
      "Free Invoice Generator: Create & Send Professional Invoices in Minutes",
    description:
      "Get paid on time with our free invoice maker. Create professional invoices & get them to clients instantly.",
    url: baseUrl,
    type: "website",
    images: "/og-image.jpeg",
    siteName: "Invoice Generator",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ThatsPranav",
    creator: "@ThatsPranav",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={`${GeistSans.className} flex flex-col min-h-screen`}>

        {/* Header */}
        <header className="w-full bg-white shadow-sm px-8 py-6">
    <div className="max-w-6xl mx-auto flex justify-end">
      <div className="flex items-center space-x-6">
        <Link href="/documentation"
        className="whitespace-nowrap hover:no-underline font-medium group rounded- [8px] text-sm text-[#333] hover:bg- [#5E5E5E] transition duration-150 ease-in-out flex items-center p-[10px] relative"
        aria-label="Navigate to Documentation"
        >
          Documentation
        </Link>

        <Link href="/support"
        className="whitespace-nowrap hover:no-underline font-medium group rounded- [8px] text-sm text-[#333] hover:bg- [#5E5E5E] transition duration-150 ease-in-out flex items-center p-[10px] relative"
        aria-label="Navigate to Support"
        >
          Support
        </Link>
        
        <Link 
        href="/login" 
        className="whitespace-nowrap hover:no-underline font-medium group rounded-[8px] text-sm text-[#333] hover:bg-[#5E5E5E] transition duration-150 ease-in-out flex items-center p-[10px] relative"
        aria-label="Navigate To Login"
      >
        Login
      </Link>

        <Link 
        href="/signup" 
        className="whitespace-nowrap hover:no-underline font-medium group rounded-[8px] text-sm text-[#333] hover:bg-[#5E5E5E] transition duration-150 ease-in-out flex items-center p-[10px] relative"
        aria-label="Navigate To Sign Up"
      >
        Sign Up
      </Link>

      <Link href="/logout"
      className="whitespace-nowrap hover:no-underline font-medium group rounded-[8px] text-sm text-[#333] hover:bg-[#5E5E5E] transition duration-150 ease-in-out flex items-center p-[10px] relative"
      aria-label="Navigate to log out"
      >
      Log Out
      </Link>
      </div>
      </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      

      {/* Footer */}

       <footer className="bg-white border-t border-gray-200 text-gray-700 px-6 py-8 text-sm">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* About Us */}
    <div className="md:pr-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">About Us</h3>
      <p className="leading-relaxed text-gray-600">
        At TEDTOOLS, we make invoicing effortless, fast, and accessible for everyone.
        Designed with UAE businesses in mind, our platform offers a seamless way to generate
        professional invoices in seconds.
      </p>
    </div>

    {/* Useful Links */}
    <div className="md:px-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">Useful Links</h3>
      <ul className="space-y-1 text-gray-600">
        <li>
          <Link href="/about" className="hover:text-blue-600 underline">About Us</Link>
        </li>
        <li>
          <Link href="/privacy-policy" className="hover:text-blue-600 underline">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/contactUs" className="hover:text-blue-600 underline">Contact Us</Link>
        </li>
        <li>
          <Link href="/terms-conditions" className="hover:text-blue-600 underline">Terms & Conditions</Link>
        </li>
      </ul>
    </div>

    {/* Contact Info */}
    <div className="md:pl-6">
      <h3 className="text-base font-semibold text-gray-900 mb-2">Contact Information</h3>
      <p className="text-gray-600 leading-relaxed">
        IUNICONNECT TECHNOLOGIES Office <br />
        C1 - 1F - SF3897, Ajman Free Zone <br />
        C1 Buildings 4442612247
      </p>

      <h3 className="text-sm font-semibold text-gray-800 mb-2">Contact Us On</h3>
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 flex items-center justify-center border border-gray-300 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-800"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 4h16v16H4V4zm0 0l8 6 8-6"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800">Email: <Link href="mailto:support@tedtools.com" className="text-blue-600 hover:underline text-sm">
            support@tedtools.com
          </Link>
          </p>
        </div>
      </div>
    </div>
  </div>

  {/* Footer Bottom Centered */}
  <div className="mt-8 text-center text-xs text--400">
    &copy; {new Date().getFullYear()} <strong>TEDTOOLS</strong> . All rights reserved.
  </div>
</footer>

      </body>
    </html>
    )}
