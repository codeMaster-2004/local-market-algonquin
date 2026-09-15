import Link from "next/link";
import { Hero } from "@/components/Hero";
import { StoreHours } from "@/components/StoreHours";
import { Departments } from "@/components/Departments";
import { WeeklyAdMock } from "@/components/WeeklyAdMock";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <StoreHours />
        <Departments />
        <section className="bg-forest text-paper">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-16">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-citrus">
                End-to-end demo
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Search, weigh, and pick up
              </h2>
              <p className="mt-3 text-paper/80 leading-relaxed">
                Try the mock shop — onions by the pound, oats by the box, live
                stock status, then a cart built for in-store pickup.
              </p>
            </div>
            <Link
              href="/shop?q=onions"
              className="inline-flex shrink-0 items-center justify-center bg-citrus px-6 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus"
            >
              Try searching onions
            </Link>
          </div>
        </section>
        <WeeklyAdMock />
      </main>
      <SiteFooter />
    </>
  );
}
