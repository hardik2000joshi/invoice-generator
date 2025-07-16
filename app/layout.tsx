import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import Script from "next/script";

function getValidURL(raw: string | undefined, fallback: string) {
  const value = (raw || "").trim().toLowerCase();
  if (!value || value === "null" || value === "undefined") {
    return fallback;
  }
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

const baseUrl = getValidURL(process.env.NEXT_PUBLIC_URL, "http://localhost:3000");
console.log("DEBUG: process.env.NEXT_PUBLIC_URL =", process.env.NEXT_PUBLIC_URL);
console.log("DEBUG: baseUrl =", baseUrl);

export const viewport: Viewport = {
  themeColor: "#f97316",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: getSafeURLObject(process.env.NEXT_PUBLIC_URL, "http://localhost:3000"),
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

       <footer className="w-full bg-[whitesmoke] py-8 border-t mt-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-xl text-gray-800">
          <Link 
          href='/about'
          className="hover: underline transition duration-150 ease-in-out"
          >
          About Us
          </Link>
          <Link 
          href='/privacy-policy'
          className="hover: underline transition duration-150 ease-in-out"
          >
          Privacy Policy 
          </Link>

          <Link href='/contactUs'
          className="hover: underline transition duration-150 ease-in-out"
          >
            Contact Us
          </Link>

          <Link href='/terms & conditions'
          className="hover: underline transition duration-150 ease-in-out"
          >
            Terms & Conditions
          </Link>
          </div>
        </footer>

      </body>
    </html>
  );
}
