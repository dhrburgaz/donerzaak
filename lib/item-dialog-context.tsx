"use client";

import { createContext, useContext, useState } from "react";
import type { MenuItem } from "@/types";
import { MenuItemDialog } from "@/components/order/MenuItemDialog";
import { track } from "@/lib/analytics";

const ItemDialogContext = createContext<((item: MenuItem) => void) | null>(null);

export function ItemDialogProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<MenuItem | null>(null);

  function open(nextItem: MenuItem) {
    setItem(nextItem);
    track("menu_item_viewed", { itemId: nextItem.id, name: nextItem.name });
  }

  return (
    <ItemDialogContext.Provider value={open}>
      {children}
      {item && <MenuItemDialog item={item} onClose={() => setItem(null)} />}
    </ItemDialogContext.Provider>
  );
}

export function useItemDialog() {
  const ctx = useContext(ItemDialogContext);
  if (!ctx) throw new Error("useItemDialog must be used within an ItemDialogProvider");
  return ctx;
}
