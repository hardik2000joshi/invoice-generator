"use client";

import {motion} from "framer-motion";
import Image from "next/image";

const brands = [
    {src: "/zoho-invoice-review.png", alt: "Zoho invoice"},
    {src: "/Quickbooks.jpeg", alt: "Quickbooks logo"},
    {src: "/FreshBooks.jpeg", alt: "FreshBooks logo"},
    {src: "/Square Invoices.png", alt: "SquareInvoice logo"},
    {src: "/invoice2go-logo.jpg", alt: "invoice2go logo"},
    {src: "/pandadoc.png", alt: "pandadoc logo"},
];

export function BrandLogos() {
    return (
        <div className="overflow-hidden whitespace-nowrap py-10">
            <p className="text-center text-xl text-neutral-600 mb-6">
                The world&apos;s most popular brands used by TedTools
            </p>
            <motion.div
            className="flex"
            animate={{
                x: ["-100%", "0%"],
                transition: {
                    ease: "linear",
                    duration: 30,
                    repeat: Infinity,
                },
            }}
            >
                {[...brands, ...brands].map((brand, index) => (
                    <div key={index} className="flex-none mx-8">
                        <Image src={brand.src}
                        alt={brand.alt}
                        width={120}
                        height={40}
                        style={{objectFit: "contain"}}
                        />
                    </div>
                ))}
                </motion.div>

        </div>
    );
}