"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import {
  formatMoney,
  stockLabels,
  type Product,
} from "@/lib/products";

function StockBadge({ stock }: { stock: Product["stock"] }) {
  const styles = {
    "in-stock": "text-leaf",
    "low-stock": "text-citrus",
    "out-of-stock": "text-tomato",
  } as const;

  return (
    <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${styles[stock]}`}>
      {stockLabels[stock]}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const isWeight = product.sellBy === "weight";
  const [qty, setQty] = useState(isWeight ? 1 : 1);
  const [added, setAdded] = useState(false);
  const unavailable = product.stock === "out-of-stock";

  function bump(delta: number) {
    setQty((prev) => {
      if (isWeight) {
        const next = Math.round((prev + delta) * 4) / 4;
        return Math.max(0.25, Math.min(20, next));
      }
      return Math.max(1, Math.min(24, prev + delta));
    });
  }

  function onAdd() {
    if (unavailable) return;
    addItem(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <article className="flex flex-col border-t-2 border-leaf/25 bg-paper">
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ backgroundColor: product.accent }}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={
              product.category === "grocery"
                ? "object-contain p-5 sm:p-6"
                : "object-cover"
            }
          />
        ) : (
          <div
            className="absolute inset-0 opacity-50"
            style={{
              backgroundImage: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(26,61,46,0.12), transparent 50%)`,
            }}
            aria-hidden
          />
        )}
        <div
          className={`absolute inset-x-0 bottom-0 px-4 pb-3 pt-10 ${
            product.category === "grocery"
              ? "bg-gradient-to-t from-forest-deep/35 to-transparent"
              : "bg-gradient-to-t from-forest-deep/55 to-transparent"
          }`}
        >
          <StockBadge stock={product.stock} />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            {product.brand}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-snug text-ink">
            {product.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {product.description}
          </p>
        </div>

        <p className="font-display text-2xl font-semibold tracking-tight text-forest">
          {formatMoney(product.price)}
          <span className="ml-1 text-sm font-sans font-medium text-muted">
            / {product.unitLabel}
          </span>
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              {isWeight ? "Pounds" : "Qty"}
            </span>
            <div className="flex items-center border border-forest/15">
              <button
                type="button"
                onClick={() => bump(isWeight ? -0.25 : -1)}
                disabled={unavailable}
                className="px-3 py-2 text-sm font-semibold text-forest transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={isWeight ? "Decrease pounds" : "Decrease quantity"}
              >
                −
              </button>
              <span className="min-w-[3.5rem] px-2 text-center text-sm font-semibold tabular-nums text-ink">
                {isWeight ? qty.toFixed(2).replace(/\.?0+$/, "") : qty}
                {isWeight ? " lb" : ""}
              </span>
              <button
                type="button"
                onClick={() => bump(isWeight ? 0.25 : 1)}
                disabled={unavailable}
                className="px-3 py-2 text-sm font-semibold text-forest transition hover:bg-sage disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={isWeight ? "Increase pounds" : "Increase quantity"}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onAdd}
            disabled={unavailable}
            className="inline-flex items-center justify-center bg-forest px-4 py-3 text-sm font-semibold tracking-wide text-paper transition hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:bg-muted/40 disabled:text-paper/70"
          >
            {unavailable
              ? "Unavailable"
              : added
                ? "Added for pickup"
                : "Add for pickup"}
          </button>
        </div>
      </div>
    </article>
  );
}
