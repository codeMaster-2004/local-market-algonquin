import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { CartProvider } from "@/components/cart/CartProvider";
import { SiteNav } from "@/components/SiteNav";
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
  title: {
    default: "Local Market Shop & Save | Algonquin, IL",
    template: "%s | Local Market Algonquin",
  },
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
      <body className="flex min-h-full flex-col font-sans text-ink">
        <CartProvider>
          <SiteNav />
          <div className="flex flex-1 flex-col">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}
