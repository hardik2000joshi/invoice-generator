"use client";

import {motion} from "framer-motion";
import Image from "next/image";

const brands = [
    {src: "/mercari_sub.jpg", alt: "Mercari Logo"},
    {src: "/doordash.png", alt: "doordash logo"},
    {src: "/naver.png", alt: "naver logo"},
    {src: "/Smartly_logo.png", alt: "smartly logo"},
    {src: "/depop.png", alt: "Depop logo"},
    {src: "/amazon.png", alt: "Amazon logo"},
    {src: "/Klarna.png", alt: "KLARNA Logo"},
];

export function BrandLogos() {
    return (
        <div className="overflow-hidden whitespace-nowrap py-10">
            <p className="text-center text-xl text-neutral-600 mb-6">
                The world's most popular brands used by TedTools
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