import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import clsx from "clsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Salla | Ecommerce",
  description:
    "Salla provides you with integrated and smart digital solutions to start your ecommerce easily and safely - Start locally and grow globally. Connect your store with professional payments solutions,",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.salla.network/fonts/pingarlt.css?v=1.0"
        />
        <link
          rel="stylesheet"
          href="https://cdn.salla.network/fonts/sallaicons.css"
        />
      </head>
      <body className={clsx(inter.className, "w-full min-h-screen bg-gray-50")}>
        {children}
        <Toaster position="bottom-left" />
      </body>
    </html>
  );
}
