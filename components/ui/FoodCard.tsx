"use client";

import type { MenuItem } from "@/types";
import { FoodImage } from "@/components/ui/FoodImage";
import { DietaryBadge, PopularBadge, SpicyBadge } from "@/components/ui/DietaryBadge";
import { Price } from "@/components/ui/Price";
import { useItemDialog } from "@/lib/item-dialog-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

export function FoodCard({ item }: { item: MenuItem }) {
  const openDialog = useItemDialog();
  const { addLine } = useCart();
  const showToast = useToast();
  const hasModifiers = (item.modifiers ?? []).length > 0;

  function handleAdd() {
    if (hasModifiers) {
      openDialog(item);
      return;
    }
    addLine({
      itemId: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity: 1,
      selections: [],
    });
    showToast(`${item.name} toegevoegd aan je bestelling`);
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-warm-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => openDialog(item)}
        className="block text-left"
        aria-label={`${item.name} bekijken`}
      >
        <FoodImage
          label={item.name}
          item={item}
          className="aspect-[4/3] transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {item.popular && <PopularBadge />}
          {item.dietary.map((tag) => (
            <DietaryBadge key={tag} tag={tag} />
          ))}
          {item.spicyLevel ? <SpicyBadge level={item.spicyLevel as 1 | 2 | 3} /> : null}
        </div>
        <button type="button" onClick={() => openDialog(item)} className="text-left">
          <h3 className="font-display text-base font-semibold text-forest">{item.name}</h3>
        </button>
        <p className="flex-1 text-sm text-charcoal/70">{item.description}</p>
        <div className="flex items-center justify-between pt-1">
          <Price amount={item.price} className="text-base text-charcoal" />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!item.available}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-forest px-4 text-sm font-semibold text-warm-white hover:bg-[#0f2e24] disabled:bg-muted"
          >
            {item.available ? "Toevoegen" : "Niet beschikbaar"}
          </button>
        </div>
      </div>
    </div>
  );
}
