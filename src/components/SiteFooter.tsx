import Link from "next/link";
import { store } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-forest/10 bg-sage">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="font-display text-xl font-semibold text-forest">
            {store.name}
          </p>
          <p className="mt-2 text-sm text-muted">
            {store.addressLine1}, {store.addressLine2}
          </p>
          <p className="mt-1 text-sm">
            <a
              href={store.phoneHref}
              className="font-medium text-forest transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              {store.phone}
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-4 gap-y-2 sm:justify-end"
          >
            <Link
              href="/shop"
              className="text-sm font-semibold text-leaf transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
            >
              Shop
            </Link>
            <Link
              href="/deals"
              className="text-sm font-semibold text-leaf transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
            >
              Deals
            </Link>
            <Link
              href="/cart"
              className="text-sm font-semibold text-leaf transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
            >
              Cart
            </Link>
            <a
              href={store.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-leaf transition hover:text-forest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf"
            >
              Facebook
            </a>
          </nav>
          <p className="text-xs text-muted">
            © {year} {store.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
