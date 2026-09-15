import Image from "next/image";
import Link from "next/link";
import { store } from "@/lib/content";

export function Hero() {
  return (
    <section
      aria-label="Welcome"
      className="relative isolate min-h-[100svh] overflow-hidden bg-forest-deep text-paper"
    >
      <Image
        src="/hero.jpg"
        alt="Fresh produce aisle at a neighborhood market"
        fill
        priority
        sizes="100vw"
        className="hero-ken-burns object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/55 to-forest/30"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 10%, rgba(232,163,23,0.18), transparent 45%), radial-gradient(ellipse at 80% 80%, rgba(45,106,79,0.35), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pb-16 pt-28 sm:px-8 sm:pb-20 lg:pb-24">
        <p className="font-display text-4xl font-semibold tracking-tight text-paper drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl">
          {store.name}
        </p>
        <h1 className="mt-4 max-w-xl font-display text-2xl font-medium leading-snug text-sage sm:text-3xl md:text-4xl">
          {store.tagline}
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-paper/85 sm:text-lg">
          {store.support}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center bg-citrus px-6 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus"
          >
            Shop for pickup
          </Link>
          <Link
            href="/deals"
            className="inline-flex items-center justify-center border border-paper/50 bg-paper/10 px-6 py-3 text-sm font-semibold tracking-wide text-paper backdrop-blur-sm transition hover:bg-paper/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
          >
            View weekly deals
          </Link>
        </div>
      </div>
    </section>
  );
}
