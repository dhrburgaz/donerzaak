"use client";

import { useState } from "react";
import type { MenuCategory, MenuItem } from "@/types";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { CartSummary } from "@/components/order/CartSummary";
import { CartDrawer } from "@/components/order/CartDrawer";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function BestellenView({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { itemCount, subtotal, hydrated } = useCart();

  return (
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-8 lg:px-8 lg:py-10">
      <div>
        <MenuBrowser categories={categories} items={items} />
      </div>

      <aside className="sticky top-24 hidden rounded-2xl border border-border bg-warm-white p-5 shadow-sm lg:block">
        <h2 className="font-display text-lg font-bold text-forest">Jouw bestelling</h2>
        <div className="mt-4">
          <CartSummary />
        </div>
      </aside>

      {hydrated && itemCount > 0 && (
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          style={{ bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))" }}
          className="fixed inset-x-4 z-40 flex h-13 items-center justify-between rounded-full bg-forest px-5 text-warm-white shadow-lg lg:hidden"
        >
          <span className="font-semibold">Bekijk bestelling</span>
          <span className="font-display font-bold">{formatPrice(subtotal)}</span>
        </button>
      )}

      {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
    </div>
  );
}
