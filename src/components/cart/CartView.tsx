"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatMoney } from "@/lib/products";

export function CartView() {
  const { resolved, subtotal, ready, setQuantity, removeItem } = useCart();

  if (!ready) {
    return (
      <p className="text-muted" aria-live="polite">
        Loading your cart…
      </p>
    );
  }

  if (resolved.length === 0) {
    return (
      <div className="max-w-lg">
        <p className="text-muted leading-relaxed">
          Your pickup cart is empty. Search the aisle for onions, oats, and more
          — then add items for in-store pickup.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center justify-center bg-citrus px-6 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:items-start">
      <ul className="divide-y divide-forest/10 border-y border-forest/10 bg-paper">
        {resolved.map((line) => {
          const isWeight = line.product.sellBy === "weight";
          return (
            <li
              key={line.productId}
              className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {line.product.brand}
                </p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">
                  {line.product.name}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {formatMoney(line.product.price)} / {line.product.unitLabel}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                <div className="flex items-center border border-forest/15">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        line.productId,
                        line.quantity - (isWeight ? 0.25 : 1),
                      )
                    }
                    className="px-3 py-2 text-sm font-semibold text-forest transition hover:bg-sage"
                    aria-label="Decrease"
                  >
                    −
                  </button>
                  <span className="min-w-[3.75rem] px-2 text-center text-sm font-semibold tabular-nums">
                    {isWeight
                      ? `${line.quantity.toFixed(2).replace(/\.?0+$/, "")} lb`
                      : line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity(
                        line.productId,
                        line.quantity + (isWeight ? 0.25 : 1),
                      )
                    }
                    className="px-3 py-2 text-sm font-semibold text-forest transition hover:bg-sage"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
                <p className="min-w-[4.5rem] text-right font-display text-lg font-semibold text-forest">
                  {formatMoney(line.total)}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(line.productId)}
                  className="text-sm font-semibold text-tomato transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomato"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="border-t-2 border-leaf/30 bg-paper p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">
          Pickup summary
        </p>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <span className="text-muted">Subtotal</span>
          <span className="font-display text-3xl font-semibold text-forest">
            {formatMoney(subtotal)}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Pay in store when you pick up. No delivery on this mock order flow.
        </p>
        <Link
          href="/checkout"
          className="mt-6 inline-flex w-full items-center justify-center bg-forest px-5 py-3 text-sm font-semibold tracking-wide text-paper transition hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Continue to pickup
        </Link>
        <Link
          href="/shop"
          className="mt-3 inline-flex w-full items-center justify-center border border-forest/20 px-5 py-3 text-sm font-semibold text-forest transition hover:border-forest/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Keep shopping
        </Link>
      </aside>
    </div>
  );
}
