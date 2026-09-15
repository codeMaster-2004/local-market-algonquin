import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { ShopBrowser } from "@/components/shop/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop for pickup",
  description:
    "Browse produce by the pound or packaged groceries by the item, then pick up in store at Local Market Algonquin.",
};

type ShopPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const initialQuery = typeof params.q === "string" ? params.q : "";

  return (
    <>
      <main className="flex-1 bg-mist">
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-sage to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
              Order for pickup
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl md:text-5xl">
              Shop the aisle — weigh it or count it
            </h1>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              Produce like onions, carrots, and oranges is sold by the pound.
              Packaged goods are sold by the item. Add what you need, then pick
              it up at the Randall Road store.
            </p>

            <div className="mt-10">
              <ShopBrowser initialQuery={initialQuery} />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
