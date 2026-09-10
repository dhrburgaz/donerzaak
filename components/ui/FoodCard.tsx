"use client";

import type { MenuItem } from "@/types";
import { FoodImage } from "@/components/ui/FoodImage";
import { DietaryBadge, PopularBadge, SpicyBadge } from "@/components/ui/DietaryBadge";
import { Price } from "@/components/ui/Price";
import { useItemDialog } from "@/lib/item-dialog-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

const tiltClasses = ["rotate-[-1.1deg]", "rotate-[0.7deg]", "rotate-[-0.5deg]"];

export function FoodCard({ item, tiltIndex }: { item: MenuItem; tiltIndex?: number }) {
  const openDialog = useItemDialog();
  const { addLine } = useCart();
  const showToast = useToast();
  const hasModifiers = (item.modifiers ?? []).length > 0;
  const tilt = tiltIndex != null ? tiltClasses[tiltIndex % tiltClasses.length] : "";

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
    <div
      className={`group flex flex-col overflow-hidden rounded-3xl border border-border bg-warm-white shadow-md transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:rotate-0 hover:shadow-2xl ${tilt}`}
    >
      <div className="relative overflow-hidden">
        <button
          type="button"
          onClick={() => openDialog(item)}
          className="block text-left"
          aria-label={`${item.name} bekijken`}
        >
          <FoodImage label={item.name} item={item} className="aspect-[4/3]" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
          />
        </button>
        <FavoriteButton
          itemId={item.id}
          itemName={item.name}
          className="absolute right-3 top-3 h-9 w-9"
        />
      </div>
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
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-forest px-4 text-sm font-semibold text-warm-white shadow-[0_3px_0_0_#0f2e24] transition-transform hover:bg-[#0f2e24] active:translate-y-0.5 active:shadow-[0_1px_0_0_#0f2e24] disabled:bg-muted disabled:shadow-none"
          >
            {item.available ? "Toevoegen" : "Niet beschikbaar"}
          </button>
        </div>
      </div>
    </div>
  );
}
