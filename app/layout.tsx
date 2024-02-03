import React from "react";

import type { Metadata } from "next";
import type { Viewport } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Mortage Calculator",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 0.9,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
