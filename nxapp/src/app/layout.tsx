import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "nxapp – Product Catalogue",
  description: "A Next.js 16 product catalogue built with Tailwind CSS and the App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        {children}
      </body>
    </html>
  );
}