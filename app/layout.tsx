import type { Metadata } from "next";
import { Outfit, Bungee } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
});

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "SWEETE - Premium Sweets & Pastries Delivered",
  description: "Discover and order the finest sweets, pastries, chocolates and desserts from top bakeries near you.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${bungee.variable} h-full antialiased`}>
      <body className={`${outfit.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
