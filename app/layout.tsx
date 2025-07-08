import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import Script from "next/script";

function getValidURL(raw: string | undefined, fallback: string) {
  if (!raw || raw.toLowerCase() === "null" || raw.toLowerCase() === "undefined") {
    return fallback;
  }
  try {
    // Try to construct a URL to validate
    new URL(raw);
    return raw;
  } catch {
    console.warn("Invalid NEXT_PUBLIC_URL, using fallback");
    return fallback;
  }
}

// Always returns a valid URL object
function getSafeURLObject(raw: string | undefined, fallback: string) {
  try {
    return new URL(getValidURL(raw, fallback));
  } catch {
    return new URL(fallback);
  }
}

const baseUrl = getValidURL(process.env.NEXT_PUBLIC_URL, "http://localhost:3000");

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
      <body className={`${GeistSans.className}`}>{children}</body>
    </html>
  );
}
