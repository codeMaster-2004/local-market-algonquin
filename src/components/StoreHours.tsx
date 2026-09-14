"use client";

import { useEffect, useState } from "react";
import { hours, store } from "@/lib/content";

function isOpenNow(now: Date): boolean {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = hours.find((h) => h.dayIndex === day);
  if (!today) return false;
  return minutes >= today.openMinutes && minutes < today.closeMinutes;
}

export function StoreHours() {
  const [open, setOpen] = useState<boolean | null>(null);
  const todayIndex = new Date().getDay();

  useEffect(() => {
    const tick = () => setOpen(isOpenNow(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="hours"
      aria-labelledby="hours-heading"
      className="relative overflow-hidden bg-sage"
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-leaf/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
            Visit us
          </p>
          <h2
            id="hours-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl"
          >
            Store hours &amp; location
          </h2>
          <p className="mt-4 max-w-md text-muted leading-relaxed">
            Stop by for everyday essentials and department specialties on Randall
            Road in Algonquin.
          </p>

          <address className="mt-8 not-italic">
            <p className="font-display text-xl font-medium text-forest">
              {store.addressLine1}
            </p>
            <p className="text-muted">{store.addressLine2}</p>
            <p className="mt-3">
              <a
                href={store.phoneHref}
                className="text-lg font-semibold text-tomato transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tomato"
              >
                {store.phone}
              </a>
            </p>
          </address>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={store.phoneHref}
              className="inline-flex bg-forest px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Call store
            </a>
            <a
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-forest/25 bg-paper px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-forest/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Directions
            </a>
            <a
              href={store.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex border border-forest/25 bg-paper px-5 py-2.5 text-sm font-semibold text-forest transition hover:border-forest/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            >
              Facebook
            </a>
          </div>

          {open !== null && (
            <p
              className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${open ? "text-leaf" : "text-tomato"}`}
              aria-live="polite"
            >
              <span
                className={`h-2 w-2 rounded-full ${open ? "bg-leaf" : "bg-tomato"}`}
                aria-hidden
              />
              {open ? "Open now" : "Closed now"}
            </p>
          )}
        </div>

        <div>
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Weekly store hours</caption>
            <thead>
              <tr className="border-b border-forest/15 text-sm uppercase tracking-wider text-muted">
                <th scope="col" className="pb-3 font-semibold">
                  Day
                </th>
                <th scope="col" className="pb-3 font-semibold">
                  Hours
                </th>
              </tr>
            </thead>
            <tbody>
              {hours.map((row) => {
                const isToday = row.dayIndex === todayIndex;
                return (
                  <tr
                    key={row.day}
                    className={`border-b border-forest/10 ${isToday ? "bg-paper/70" : ""}`}
                  >
                    <th
                      scope="row"
                      className={`py-3.5 pr-4 font-medium ${isToday ? "text-forest" : "text-ink"}`}
                    >
                      {row.day}
                      {isToday && (
                        <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-leaf">
                          Today
                        </span>
                      )}
                    </th>
                    <td className={`py-3.5 ${isToday ? "font-semibold text-forest" : "text-muted"}`}>
                      {row.open} – {row.close}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-muted">
            Hours are provisional and may change — please call to confirm.
          </p>
        </div>
      </div>
    </section>
  );
}
