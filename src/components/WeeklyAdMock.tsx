"use client";

import { useState } from "react";
import { store, weeklyAd, type AdDeal } from "@/lib/content";

function OfferPrice({ price }: { price: string }) {
  const multi = price.match(/^(\d+)\/\$(\d+(?:\.\d+)?)$/);
  if (multi) {
    return (
      <span className="font-display font-semibold tracking-tight text-forest">
        <span className="text-3xl sm:text-4xl">{multi[1]}</span>
        <span className="text-xl text-tomato">/</span>
        <span className="text-3xl text-tomato sm:text-4xl">${multi[2]}</span>
      </span>
    );
  }

  if (price.endsWith("¢")) {
    return (
      <span className="font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl">
        {price}
      </span>
    );
  }

  const dollarMatch = price.match(/^(\d+)\.(\d{2})$/);
  if (dollarMatch) {
    return (
      <span className="font-display font-semibold tracking-tight text-forest">
        <span className="align-top text-lg text-muted">$</span>
        <span className="text-4xl sm:text-5xl">{dollarMatch[1]}</span>
        <span className="align-super text-xl">{dollarMatch[2]}</span>
      </span>
    );
  }

  return (
    <span className="font-display text-4xl font-semibold tracking-tight text-forest">
      {price}
    </span>
  );
}

function OfferTile({
  deal,
  featured = false,
}: {
  deal: AdDeal;
  featured?: boolean;
}) {
  return (
    <article
      className={`flex flex-col justify-between border-t-2 border-leaf/30 bg-paper ${
        featured
          ? "gap-6 p-8 sm:col-span-2 sm:flex-row sm:items-end sm:gap-10 sm:p-10 lg:col-span-3"
          : "gap-4 p-6 sm:p-7"
      }`}
    >
      <div className={featured ? "max-w-xl" : undefined}>
        {deal.badge && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-leaf">
            {deal.badge}
          </p>
        )}
        <h3
          className={`font-display font-semibold leading-snug text-ink ${
            featured ? "text-2xl sm:text-3xl" : "text-lg"
          }`}
        >
          {deal.title}
        </h3>
        <p className={`mt-2 text-muted ${featured ? "text-base" : "text-sm"}`}>
          {deal.unit}
        </p>
      </div>
      <div className={featured ? "shrink-0" : "mt-auto pt-2"}>
        <OfferPrice price={deal.price} />
      </div>
    </article>
  );
}

export function WeeklyAdMock() {
  const [activeId, setActiveId] = useState(weeklyAd.categories[0].id);
  const active =
    weeklyAd.categories.find((c) => c.id === activeId) ?? weeklyAd.categories[0];

  const featured = active.deals.find((d) => d.featured) ?? active.deals[0];
  const rest = active.deals.filter((d) => d !== featured);

  return (
    <section
      id="weekly-ad"
      aria-labelledby="weekly-ad-heading"
      className="relative overflow-hidden bg-mist"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-sage to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
              Weekly specials
            </p>
            <h2
              id="weekly-ad-heading"
              className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl"
            >
              Browse deals — not a packed sheet
            </h2>
            <p className="mt-4 text-muted leading-relaxed">{weeklyAd.note}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <p className="text-sm font-semibold text-forest">{weeklyAd.validity}</p>
            <a
              href={store.weeklyAdUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-forest/20 bg-paper px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-forest/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              View print circular
            </a>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Deal departments"
          className="mt-10 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {weeklyAd.categories.map((category) => {
            const selected = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`ad-tab-${category.id}`}
                aria-controls={`ad-panel-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={`shrink-0 px-4 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${
                  selected
                    ? "bg-forest text-paper"
                    : "bg-paper text-muted hover:text-forest"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          key={active.id}
          role="tabpanel"
          id={`ad-panel-${active.id}`}
          aria-labelledby={`ad-tab-${active.id}`}
          className="ad-page-enter mt-8"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            {active.label}
            <span className="mx-2 text-leaf/40" aria-hidden>
              ·
            </span>
            {active.deals.length} highlighted offers
          </p>

          <div className="grid gap-px bg-forest/10 sm:grid-cols-2 lg:grid-cols-3">
            <OfferTile deal={featured} featured />
            {rest.map((deal) => (
              <OfferTile key={deal.title} deal={deal} />
            ))}
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted leading-relaxed">
          Digital preview samples standout items from this week&apos;s circular.
          For every SKU and fine print, open the official print circular online.
        </p>
      </div>
    </section>
  );
}
