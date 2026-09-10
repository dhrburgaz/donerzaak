"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import type { CartLine, CartModifierSelection } from "@/types";
import { track } from "@/lib/analytics";

const CART_STORAGE_KEY = "freshtasty-cart";
const CART_VERSION = 1;

type StoredCart = {
  version: number;
  lines: CartLine[];
};

type CartState = {
  lines: CartLine[];
  hydrated: boolean;
};

type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; line: CartLine }
  | { type: "remove"; lineId: string }
  | { type: "setQuantity"; lineId: string; quantity: number }
  | { type: "setNotes"; lineId: string; notes: string }
  | { type: "clear" };

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines, hydrated: true };
    case "add":
      return { ...state, lines: [...state.lines, action.line] };
    case "remove":
      return {
        ...state,
        lines: state.lines.filter((l) => l.lineId !== action.lineId),
      };
    case "setQuantity":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.lineId === action.lineId
            ? { ...l, quantity: Math.max(1, action.quantity) }
            : l
        ),
      };
    case "setNotes":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.lineId === action.lineId ? { ...l, notes: action.notes } : l
        ),
      };
    case "clear":
      return { ...state, lines: [] };
    default:
      return state;
  }
}

function lineTotal(line: CartLine): number {
  const modifierTotal = line.selections.reduce((sum, s) => sum + s.priceDelta, 0);
  return (line.unitPrice + modifierTotal) * line.quantity;
}

type CartContextValue = {
  lines: CartLine[];
  hydrated: boolean;
  addLine: (line: Omit<CartLine, "lineId">) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  setNotes: (lineId: string, notes: string) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  lineTotal: (line: CartLine) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        dispatch({ type: "hydrate", lines: [] });
        return;
      }
      const parsed = JSON.parse(raw) as StoredCart;
      if (parsed.version !== CART_VERSION || !Array.isArray(parsed.lines)) {
        dispatch({ type: "hydrate", lines: [] });
        return;
      }
      dispatch({ type: "hydrate", lines: parsed.lines });
    } catch {
      dispatch({ type: "hydrate", lines: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    try {
      const payload: StoredCart = { version: CART_VERSION, lines: state.lines };
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // localStorage unavailable (private mode, quota) — cart still works in-memory.
    }
  }, [state.lines, state.hydrated]);

  const addLine = useCallback((line: Omit<CartLine, "lineId">) => {
    const lineId = `${line.itemId}-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    dispatch({ type: "add", line: { ...line, lineId } });
    track("add_to_cart", { itemId: line.itemId, name: line.name });
  }, []);

  const removeLine = useCallback((lineId: string) => {
    dispatch({ type: "remove", lineId });
  }, []);

  const setQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: "setQuantity", lineId, quantity });
  }, []);

  const setNotes = useCallback((lineId: string, notes: string) => {
    dispatch({ type: "setNotes", lineId, notes });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const subtotal = useMemo(
    () => state.lines.reduce((sum, l) => sum + lineTotal(l), 0),
    [state.lines]
  );

  const itemCount = useMemo(
    () => state.lines.reduce((sum, l) => sum + l.quantity, 0),
    [state.lines]
  );

  const value: CartContextValue = {
    lines: state.lines,
    hydrated: state.hydrated,
    addLine,
    removeLine,
    setQuantity,
    setNotes,
    clearCart,
    subtotal,
    itemCount,
    lineTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export type { CartModifierSelection };
