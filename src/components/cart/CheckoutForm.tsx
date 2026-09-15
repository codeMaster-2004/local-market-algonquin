"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { store } from "@/lib/content";
import { formatMoney } from "@/lib/products";

const pickupWindows = [
  "Today · 4:00–5:00 PM",
  "Today · 5:00–6:00 PM",
  "Today · 6:00–7:00 PM",
  "Tomorrow · 10:00–11:00 AM",
  "Tomorrow · 12:00–1:00 PM",
  "Tomorrow · 5:00–6:00 PM",
] as const;

type OrderSnapshotLine = {
  name: string;
  brand: string;
  qty: number;
  sellBy: "weight" | "each";
  total: number;
};

type PlacedOrder = {
  id: string;
  windowSlot: string;
  name: string;
  phone: string;
  notes: string;
  subtotal: number;
  lines: OrderSnapshotLine[];
};

export function CheckoutForm() {
  const { resolved, subtotal, ready, clear } = useCart();
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [windowSlot, setWindowSlot] = useState<string>(pickupWindows[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const empty = ready && resolved.length === 0 && !placed;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (resolved.length === 0) return;

    setPlaced({
      id: `LM-${Date.now().toString(36).toUpperCase()}`,
      windowSlot,
      name,
      phone,
      notes,
      subtotal,
      lines: resolved.map((line) => ({
        name: line.product.name,
        brand: line.product.brand,
        qty: line.quantity,
        sellBy: line.product.sellBy,
        total: line.total,
      })),
    });
    clear();
  }

  if (!ready) {
    return <p className="text-muted">Loading…</p>;
  }

  if (placed) {
    return (
      <div className="max-w-xl border-t-2 border-leaf/30 bg-paper p-8 sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-leaf">
          Order placed
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-forest">
          See you at pickup
        </h2>
        <p className="mt-4 text-muted leading-relaxed">
          Mock confirmation{" "}
          <span className="font-semibold text-ink">{placed.id}</span> is ready.
          Bring your phone — we&apos;ll match your name at the service desk.
        </p>
        <dl className="mt-6 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-forest/10 pb-3">
            <dt className="text-muted">Pickup window</dt>
            <dd className="font-semibold text-ink">{placed.windowSlot}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-forest/10 pb-3">
            <dt className="text-muted">Name</dt>
            <dd className="font-semibold text-ink">{placed.name}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-forest/10 pb-3">
            <dt className="text-muted">Phone</dt>
            <dd className="font-semibold text-ink">{placed.phone}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Pay at store</dt>
            <dd className="font-display text-xl font-semibold text-forest">
              {formatMoney(placed.subtotal)}
            </dd>
          </div>
        </dl>
        <ul className="mt-6 space-y-2 text-sm text-muted">
          {placed.lines.map((line) => (
            <li key={line.name}>
              {line.name}{" "}
              <span className="text-ink/70">
                ·{" "}
                {line.sellBy === "weight" ? `${line.qty} lb` : `×${line.qty}`}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          {store.addressLine1}, {store.addressLine2}
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center justify-center bg-citrus px-6 py-3 text-sm font-semibold text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus"
        >
          Shop again
        </Link>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="max-w-lg">
        <p className="text-muted leading-relaxed">
          Nothing to check out yet. Add a few items from the shop, then come
          back to choose a pickup window.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center justify-center bg-forest px-6 py-3 text-sm font-semibold text-paper transition hover:bg-forest-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
          Browse shop
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start"
    >
      <div className="space-y-6 border-t-2 border-leaf/30 bg-paper p-6 sm:p-8">
        <div>
          <label
            htmlFor="pickup-name"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
          >
            Name for pickup
          </label>
          <input
            id="pickup-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-forest/15 bg-mist/40 px-4 py-3 text-ink outline-none focus:border-forest/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            autoComplete="name"
          />
        </div>
        <div>
          <label
            htmlFor="pickup-phone"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
          >
            Mobile number
          </label>
          <input
            id="pickup-phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border border-forest/15 bg-mist/40 px-4 py-3 text-ink outline-none focus:border-forest/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            autoComplete="tel"
            placeholder="(847) 555-0100"
          />
        </div>
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Pickup window
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {pickupWindows.map((slot) => {
              const selected = slot === windowSlot;
              return (
                <label
                  key={slot}
                  className={`cursor-pointer border px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? "border-forest bg-sage text-forest"
                      : "border-forest/15 text-muted hover:border-forest/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="pickup-window"
                    value={slot}
                    checked={selected}
                    onChange={() => setWindowSlot(slot)}
                    className="sr-only"
                  />
                  {slot}
                </label>
              );
            })}
          </div>
        </fieldset>
        <div>
          <label
            htmlFor="pickup-notes"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-muted"
          >
            Notes (optional)
          </label>
          <textarea
            id="pickup-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-2 w-full border border-forest/15 bg-mist/40 px-4 py-3 text-ink outline-none focus:border-forest/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
            placeholder="Substitutions, bag preferences…"
          />
        </div>
      </div>

      <aside className="border-t-2 border-citrus/50 bg-paper p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-leaf">
          Order review
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          {resolved.map((line) => (
            <li
              key={line.productId}
              className="flex items-start justify-between gap-3 border-b border-forest/10 pb-3"
            >
              <span>
                <span className="font-semibold text-ink">
                  {line.product.name}
                </span>
                <span className="mt-0.5 block text-muted">
                  {line.product.sellBy === "weight"
                    ? `${line.quantity} lb`
                    : `Qty ${line.quantity}`}
                </span>
              </span>
              <span className="font-semibold tabular-nums text-forest">
                {formatMoney(line.total)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="text-muted">Due at pickup</span>
          <span className="font-display text-3xl font-semibold text-forest">
            {formatMoney(subtotal)}
          </span>
        </div>
        <button
          type="submit"
          className="mt-6 inline-flex w-full items-center justify-center bg-citrus px-5 py-3 text-sm font-semibold tracking-wide text-forest-deep transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-citrus"
        >
          Place pickup order
        </button>
        <Link
          href="/cart"
          className="mt-3 inline-flex w-full items-center justify-center text-sm font-semibold text-muted transition hover:text-forest"
        >
          Back to cart
        </Link>
      </aside>
    </form>
  );
}
