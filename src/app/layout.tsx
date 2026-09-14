import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Local Market Shop & Save | Algonquin, IL",
  description:
    "Neighborhood grocery at 100 S Randall Rd, Algonquin. Fresh produce, smokehouse meats, European bakery, and international favorites — formerly Butera Market.",
  openGraph: {
    title: "Local Market Shop & Save | Algonquin",
    description:
      "Fresher products, bigger selection, lower prices. 100 S Randall Rd, Algonquin, IL 60102.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink">{children}</body>
    </html>
  );
}
