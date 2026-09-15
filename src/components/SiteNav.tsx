"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { store } from "@/lib/content";
import { useCart } from "@/components/cart/CartProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Deals" },
] as const;

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 7h15l-1.5 9h-12z" />
      <path d="M6 7 5 3H2" />
      <circle cx="9" cy="20" r="1.25" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();
  const isHome = pathname === "/";
  const cartActive =
    pathname.startsWith("/cart") || pathname.startsWith("/checkout");
  const count = ready ? itemCount : 0;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        isHome
          ? "border-paper/10 bg-forest-deep/85 text-paper backdrop-blur-md"
          : "border-forest/10 bg-paper/95 text-ink backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6 sm:h-16 sm:px-8">
        <Link
          href="/"
          className={`font-display text-base font-semibold tracking-tight transition sm:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isHome
              ? "text-paper focus-visible:outline-paper"
              : "text-forest focus-visible:outline-forest"
          }`}
        >
          {store.shortName}
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isHome
                    ? active
                      ? "text-citrus focus-visible:outline-citrus"
                      : "text-paper/85 hover:text-paper focus-visible:outline-paper"
                    : active
                      ? "text-forest focus-visible:outline-forest"
                      : "text-muted hover:text-forest focus-visible:outline-forest"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/cart"
            aria-label={
              count > 0
                ? `Pickup cart, ${count} items`
                : "Pickup cart, empty"
            }
            className={`ml-1 inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isHome
                ? cartActive
                  ? "bg-citrus text-forest-deep focus-visible:outline-citrus"
                  : "bg-paper/15 text-paper hover:bg-paper/25 focus-visible:outline-paper"
                : cartActive
                  ? "bg-forest text-paper focus-visible:outline-forest"
                  : "bg-sage text-forest hover:bg-sage/80 focus-visible:outline-forest"
            }`}
          >
            <CartIcon className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={`inline-flex min-w-[1.25rem] items-center justify-center px-1 text-xs font-bold tabular-nums ${
                isHome
                  ? cartActive
                    ? "text-forest-deep"
                    : "bg-citrus text-forest-deep"
                  : cartActive
                    ? "text-citrus"
                    : "bg-forest text-paper"
              }`}
            >
              {count > 99 ? "99+" : count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
