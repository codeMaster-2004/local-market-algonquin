"use client";

import { useState } from "react";
import { store, weeklyAd } from "@/lib/content";

export function WeeklyAdMock() {
  const [activeId, setActiveId] = useState(weeklyAd.pages[0].id);
  const activePage =
    weeklyAd.pages.find((p) => p.id === activeId) ?? weeklyAd.pages[0];

  return (
    <section
      id="weekly-ad"
      aria-labelledby="weekly-ad-heading"
      className="relative bg-forest-deep text-paper"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 10% 20%, rgba(232,163,23,0.2), transparent 40%), radial-gradient(ellipse at 90% 70%, rgba(45,106,79,0.45), transparent 45%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-citrus">
            Weekly ad circular
          </p>
          <h2
            id="weekly-ad-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            This week&apos;s savings
          </h2>
          <p className="mt-4 text-paper/75 leading-relaxed">{weeklyAd.note}</p>
        </div>

        <div className="mt-10 overflow-hidden border border-paper/15 bg-forest/40 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 bg-forest-deep/60 px-5 py-3 sm:px-6">
            <p className="text-sm font-medium text-sage">{weeklyAd.validity}</p>
            <p className="text-xs uppercase tracking-wider text-paper/50">
              Circular mockup
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Weekly ad pages"
            className="flex flex-wrap gap-1 border-b border-paper/10 px-3 py-3 sm:px-4"
          >
            {weeklyAd.pages.map((page) => {
              const selected = page.id === activeId;
              return (
                <button
                  key={page.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`ad-tab-${page.id}`}
                  aria-controls={`ad-panel-${page.id}`}
                  onClick={() => setActiveId(page.id)}
                  className={`px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus ${
                    selected
                      ? "bg-citrus text-forest-deep"
                      : "text-paper/70 hover:bg-paper/10 hover:text-paper"
                  }`}
                >
                  {page.label}
                </button>
              );
            })}
          </div>

          <div
            key={activePage.id}
            role="tabpanel"
            id={`ad-panel-${activePage.id}`}
            aria-labelledby={`ad-tab-${activePage.id}`}
            className="ad-page-enter px-5 py-6 sm:px-8 sm:py-8"
          >
            <p className="font-display text-xl font-semibold text-citrus">
              {activePage.label} specials
            </p>
            <ul className="mt-5 divide-y divide-paper/10">
              {activePage.deals.map((deal) => (
                <li
                  key={deal.title}
                  className="flex items-baseline justify-between gap-4 py-3.5"
                >
                  <div>
                    <p className="font-medium text-paper">{deal.title}</p>
                    <p className="text-sm text-paper/55">{deal.unit}</p>
                  </div>
                  <p className="font-display text-2xl font-semibold text-sage">
                    {deal.price}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <a
            href={store.weeklyAdUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-citrus px-6 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus"
          >
            Open official weekly ad
          </a>
        </div>
      </div>
    </section>
  );
}
