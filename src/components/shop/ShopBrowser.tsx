"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { searchProducts, type Product } from "@/lib/products";

const filters = [
  { id: "all", label: "All" },
  { id: "produce", label: "Produce" },
  { id: "grocery", label: "Grocery" },
  { id: "bakery", label: "Bakery" },
  { id: "dairy", label: "Dairy" },
  { id: "meat", label: "Meat" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function ShopBrowser({
  initialQuery = "",
}: {
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<FilterId>("all");
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    let list: Product[] = searchProducts(deferredQuery);
    if (filter !== "all") {
      list = list.filter((p) => p.category === filter);
    }
    return list;
  }, [deferredQuery, filter]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block w-full max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">
            Search the aisle
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try onions, oats, tomatoes…"
            className="mt-2 w-full border border-forest/15 bg-paper px-4 py-3 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-forest/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            autoComplete="off"
          />
        </label>
        <p className="text-sm text-muted">
          {results.length}{" "}
          {results.length === 1 ? "item" : "items"}
          {deferredQuery.trim() ? (
            <>
              {" "}
              for &ldquo;{deferredQuery.trim()}&rdquo;
            </>
          ) : null}
          <span className="mx-2 text-leaf/40" aria-hidden>
            ·
          </span>
          Pickup only
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Departments"
        className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((item) => {
          const selected = item.id === filter;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item.id)}
              className={`shrink-0 px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                selected
                  ? "bg-forest text-paper"
                  : "bg-paper text-muted hover:text-forest"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {results.length === 0 ? (
        <p className="mt-12 max-w-lg text-muted leading-relaxed">
          No matches. Try a broader term like &ldquo;oats&rdquo; or
          &ldquo;onion,&rdquo; or clear the search to browse everything.
        </p>
      ) : (
        <div className="mt-8 grid gap-px bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
