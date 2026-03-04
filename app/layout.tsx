import React from "react";
import type { Metadata } from "next";
import { Archivo_Black, Space_Mono } from "next/font/google";
import "./globals.css";

const headingFont = Archivo_Black({
    weight: '400',
    subsets: ["latin"],
    variable: '--font-heading'
});

const monoFont = Space_Mono({
    weight: ['400', '700'],
    subsets: ["latin"],
    variable: '--font-mono'
});

export const metadata: Metadata = {
    title: "Hrishikesh Dutta | Backend Developer",
    description: "Portfolio of Hrishikesh Dutta - Backend Developer and ML Explorer.",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${headingFont.variable} ${monoFont.variable} font-mono bg-pure-black text-white antialiased`}>
                {children}
            </body>
        </html>
    );
}
