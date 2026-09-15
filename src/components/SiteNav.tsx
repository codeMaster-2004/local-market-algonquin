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
      className={`sticky top-0 z-50 border-b ${
        isHome
          ? "border-paper/15 bg-forest-deep text-paper"
          : "border-forest/10 bg-paper text-ink"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:gap-4 sm:px-8">
        <Link
          href="/"
          className={`shrink-0 font-display text-base font-semibold tracking-tight transition sm:text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
            isHome
              ? "text-paper focus-visible:outline-paper"
              : "text-forest focus-visible:outline-forest"
          }`}
        >
          {store.shortName}
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-0.5 sm:gap-1"
        >
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-2 text-sm font-semibold transition sm:px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isHome
                    ? active
                      ? "text-citrus focus-visible:outline-citrus"
                      : "text-paper hover:text-citrus focus-visible:outline-paper"
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
            className={`ml-1 inline-flex items-center gap-1.5 bg-citrus px-3 py-2 text-sm font-bold tracking-wide text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus sm:gap-2 sm:px-4 ${
              cartActive ? "ring-2 ring-paper ring-offset-2 ring-offset-forest-deep" : ""
            }`}
          >
            <CartIcon className="h-4 w-4 shrink-0" />
            <span>Cart</span>
            <span className="inline-flex min-w-[1.25rem] items-center justify-center bg-forest-deep px-1 text-xs font-bold tabular-nums text-paper">
              {count > 99 ? "99+" : count}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
