"use client";

import { useMemo } from "react";
import { items as allItems } from "@/data/menu";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/types";

const UPSELL_CATEGORIES = ["sauzen", "dranken", "dessert-koffie"] as const;
const UPSELL_LABELS: Record<(typeof UPSELL_CATEGORIES)[number], string> = {
  sauzen: "Nog een sausje?",
  dranken: "Drankje erbij?",
  "dessert-koffie": "Toetje of koffie?",
};

export function CartUpsells({ lines }: { lines: CartLine[] }) {
  const { addLine } = useCart();
  const showToast = useToast();

  const suggestions = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.itemId));
    return UPSELL_CATEGORIES.map((categoryId) => {
      const candidate = allItems.find(
        (i) => i.categoryId === categoryId && i.available && !inCart.has(i.id)
      );
      return candidate ? { categoryId, item: candidate } : null;
    }).filter((s): s is NonNullable<typeof s> => s !== null);
  }, [lines]);

  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 border-t border-border pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">Misschien ook lekker</p>
      <div className="flex flex-col gap-2">
        {suggestions.map(({ categoryId, item }) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              addLine({
                itemId: item.id,
                name: item.name,
                unitPrice: item.price,
                quantity: 1,
                selections: [],
              });
              showToast(`${item.name} toegevoegd aan je bestelling`);
            }}
            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-cream/40 px-3.5 py-2.5 text-left transition-colors hover:border-orange/50"
          >
            <span>
              <span className="block text-xs text-muted">{UPSELL_LABELS[categoryId]}</span>
              <span className="text-sm font-medium text-charcoal">
                {item.name} · {formatPrice(item.price)}
              </span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-warm-white">
              +
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
