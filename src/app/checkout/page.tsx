import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Pickup checkout",
  description:
    "Choose a pickup window and place your in-store pickup order at Local Market Algonquin.",
};

export default function CheckoutPage() {
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
              Almost done
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
              Schedule pickup
            </h1>
            <p className="mt-4 max-w-xl text-muted leading-relaxed">
              This is a demo checkout — no payment is collected online. You pay
              when you grab your bags at the store.
            </p>
            <div className="mt-10">
              <CheckoutForm />
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
