"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { getProduct, lineTotal, type Product } from "@/lib/products";

const STORAGE_KEY = "local-market-cart-v1";

export type CartLine = {
  productId: string;
  /** Pounds for weight items; count for each items */
  quantity: number;
};

export type CartLineResolved = CartLine & {
  product: Product;
  total: number;
};

type CartContextValue = {
  lines: CartLine[];
  resolved: CartLineResolved[];
  itemCount: number;
  subtotal: number;
  ready: boolean;
  addItem: (productId: string, quantity: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/** In-memory fallback when localStorage is blocked (private mode, etc.). */
let memoryLines: CartLine[] = [];
/** Cached snapshot — getSnapshot must return a stable reference when unchanged. */
let cachedSnapshot: CartLine[] = [];
let cachedSerialized = "[]";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function normalizeQuantity(product: Product, quantity: number): number {
  if (product.sellBy === "weight") {
    const stepped = Math.round(quantity * 4) / 4;
    return Math.max(0.25, Math.min(50, stepped));
  }
  return Math.max(1, Math.min(99, Math.round(quantity)));
}

function parseLines(raw: string | null): CartLine[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        typeof line.productId === "string" &&
        typeof line.quantity === "number" &&
        getProduct(line.productId),
    );
  } catch {
    return [];
  }
}

function sameLines(a: CartLine[], b: CartLine[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.every(
    (line, i) =>
      line.productId === b[i].productId && line.quantity === b[i].quantity,
  );
}

function readStoredLines(): CartLine[] {
  try {
    return parseLines(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return memoryLines;
  }
}

/** Stable getSnapshot for useSyncExternalStore (React error #185 if unstable). */
function getSnapshot(): CartLine[] {
  const next = readStoredLines();
  const serialized = JSON.stringify(next);
  if (serialized === cachedSerialized && sameLines(next, cachedSnapshot)) {
    return cachedSnapshot;
  }
  cachedSerialized = serialized;
  cachedSnapshot = next;
  return cachedSnapshot;
}

function writeLines(lines: CartLine[]) {
  memoryLines = lines;
  cachedSerialized = JSON.stringify(lines);
  cachedSnapshot = lines;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // private mode / quota — keep memory copy
  }
  emit();
  try {
    window.dispatchEvent(new Event("local-market-cart"));
  } catch {
    // ignore
  }
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const handler = () => onStoreChange();
  try {
    window.addEventListener("storage", handler);
    window.addEventListener("local-market-cart", handler);
  } catch {
    // ignore
  }
  return () => {
    listeners.delete(onStoreChange);
    try {
      window.removeEventListener("storage", handler);
      window.removeEventListener("local-market-cart", handler);
    } catch {
      // ignore
    }
  };
}

const EMPTY: CartLine[] = [];

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

const clientReadySnapshot = true;
const serverReadySnapshot = false;

function getReadySnapshot() {
  return clientReadySnapshot;
}

function getReadyServerSnapshot() {
  return serverReadySnapshot;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribe,
    getReadySnapshot,
    getReadyServerSnapshot,
  );

  const addItem = useCallback((productId: string, quantity: number) => {
    const product = getProduct(productId);
    if (!product || product.stock === "out-of-stock") return;
    const qty = normalizeQuantity(product, quantity);
    const current = getSnapshot();
    const existing = current.find((l) => l.productId === productId);
    if (existing) {
      writeLines(
        current.map((l) =>
          l.productId === productId
            ? {
                ...l,
                quantity: normalizeQuantity(product, l.quantity + qty),
              }
            : l,
        ),
      );
      return;
    }
    writeLines([...current, { productId, quantity: qty }]);
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const product = getProduct(productId);
    if (!product) return;
    const current = getSnapshot();

    if (quantity <= 0) {
      writeLines(current.filter((l) => l.productId !== productId));
      return;
    }

    const qty = normalizeQuantity(product, quantity);
    writeLines(
      current.map((l) =>
        l.productId === productId ? { ...l, quantity: qty } : l,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    writeLines(getSnapshot().filter((l) => l.productId !== productId));
  }, []);

  const clear = useCallback(() => writeLines([]), []);

  const resolved = useMemo(() => {
    return lines
      .map((line) => {
        const product = getProduct(line.productId);
        if (!product) return null;
        return {
          ...line,
          product,
          total: lineTotal(product, line.quantity),
        };
      })
      .filter((line): line is CartLineResolved => line !== null);
  }, [lines]);

  const subtotal = useMemo(
    () =>
      Math.round(resolved.reduce((sum, line) => sum + line.total, 0) * 100) /
      100,
    [resolved],
  );

  const itemCount = useMemo(
    () =>
      resolved.reduce(
        (sum, line) =>
          sum + (line.product.sellBy === "each" ? line.quantity : 1),
        0,
      ),
    [resolved],
  );

  const value = useMemo(
    () => ({
      lines,
      resolved,
      itemCount,
      subtotal,
      ready,
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [
      lines,
      resolved,
      itemCount,
      subtotal,
      ready,
      addItem,
      setQuantity,
      removeItem,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
