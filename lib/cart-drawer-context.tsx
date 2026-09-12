"use client";

import { createContext, useContext, useState } from "react";
import { CartDrawer } from "@/components/order/CartDrawer";
import { track } from "@/lib/analytics";

type CartDrawerContextValue = {
  open: () => void;
  close: () => void;
};

const CartDrawerContext = createContext<CartDrawerContextValue | null>(null);

/**
 * Makes the cart drawer (products, quantities, prices, total) openable
 * from anywhere in the app — the persistent mobile bottom nav's
 * "Bestelling" button needs to show cart contents on every page, not
 * just on /bestellen.
 */
export function CartDrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
    track("cart_opened");
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <CartDrawerContext.Provider value={{ open, close }}>
      {children}
      {isOpen && <CartDrawer onClose={close} />}
    </CartDrawerContext.Provider>
  );
}

export function useCartDrawer(): CartDrawerContextValue {
  const ctx = useContext(CartDrawerContext);
  if (!ctx) throw new Error("useCartDrawer must be used within a CartDrawerProvider");
  return ctx;
}
