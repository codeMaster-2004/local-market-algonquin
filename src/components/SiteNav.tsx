"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { store } from "@/lib/content";
import { useCart } from "@/components/cart/CartProvider";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Deals" },
  { href: "/cart", label: "Cart" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const { itemCount, ready } = useCart();
  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        isHome
          ? "border-transparent bg-forest-deep/70 text-paper backdrop-blur-md"
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
              link.href === "/cart"
                ? pathname.startsWith("/cart") || pathname.startsWith("/checkout")
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            const showCount = link.href === "/cart" && ready && itemCount > 0;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  isHome
                    ? active
                      ? "text-citrus focus-visible:outline-citrus"
                      : "text-paper/80 hover:text-paper focus-visible:outline-paper"
                    : active
                      ? "text-forest focus-visible:outline-forest"
                      : "text-muted hover:text-forest focus-visible:outline-forest"
                }`}
              >
                {link.label}
                {showCount && (
                  <span
                    className={`ml-1.5 inline-flex min-w-[1.25rem] items-center justify-center px-1 text-xs font-bold tabular-nums ${
                      isHome
                        ? "bg-citrus text-forest-deep"
                        : "bg-forest text-paper"
                    }`}
                    aria-label={`${itemCount} items in cart`}
                  >
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
