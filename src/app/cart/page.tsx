import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Pickup cart",
  description:
    "Review items for in-store pickup at Local Market Shop & Save in Algonquin.",
};

export default function CartPage() {
  return (
    <>
      <main className="flex-1 bg-mist">
        <div className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sage to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl px-6 py-14 sm:px-8 sm:py-16 lg:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
              Your order
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
              Pickup cart
            </h1>
            <p className="mt-4 max-w-xl text-muted leading-relaxed">
              Everything here is reserved for pickup at 100 S Randall Rd — no
              shipping, no delivery fees.
            </p>
            <div className="mt-10">
              <CartView />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
