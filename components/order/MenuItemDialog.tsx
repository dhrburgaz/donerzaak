"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuItem, ModifierGroup } from "@/types";
import { FoodImage } from "@/components/ui/FoodImage";
import { DietaryBadge, PopularBadge, SpicyBadge } from "@/components/ui/DietaryBadge";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { formatPrice } from "@/lib/format";
import { allergenLabels } from "@/data/allergens";

type Selections = Record<string, string[]>;

function defaultSelections(item: MenuItem): Selections {
  const result: Selections = {};
  for (const group of item.modifiers ?? []) {
    if (group.required && !group.multiSelect && group.options[0]) {
      result[group.id] = [group.options[0].id];
    } else {
      result[group.id] = [];
    }
  }
  return result;
}

function groupPriceDelta(group: ModifierGroup, selectedIds: string[]): number {
  const selectedOptions = group.options.filter((o) => selectedIds.includes(o.id));
  const optionTotal = selectedOptions.reduce((sum, o) => sum + o.priceDelta, 0);

  if (group.includedSelections != null) {
    const extraCount = Math.max(0, selectedIds.length - group.includedSelections);
    return optionTotal + extraCount * (group.extraSelectionPrice ?? 0);
  }

  return optionTotal;
}

export function MenuItemDialog({
  item,
  onClose,
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  const [selections, setSelections] = useState<Selections>(() => defaultSelections(item));
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const { addLine } = useCart();
  const showToast = useToast();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a, button, input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const unitTotal = useMemo(() => {
    const modifierTotal = (item.modifiers ?? []).reduce(
      (sum, group) => sum + groupPriceDelta(group, selections[group.id] ?? []),
      0
    );
    return item.price + modifierTotal;
  }, [item, selections]);

  const total = unitTotal * quantity;

  function toggleOption(group: ModifierGroup, optionId: string) {
    setSelections((prev) => {
      const current = prev[group.id] ?? [];
      if (!group.multiSelect) {
        return { ...prev, [group.id]: [optionId] };
      }
      const maxSelect = group.maxSelect;
      if (current.includes(optionId)) {
        return { ...prev, [group.id]: current.filter((id) => id !== optionId) };
      }
      if (maxSelect && current.length >= maxSelect) return prev;
      return { ...prev, [group.id]: [...current, optionId] };
    });
  }

  function handleAdd() {
    for (const group of item.modifiers ?? []) {
      if (group.required && (selections[group.id]?.length ?? 0) === 0) {
        return;
      }
    }

    const selectionRecords = (item.modifiers ?? [])
      .map((group) => {
        const ids = selections[group.id] ?? [];
        if (ids.length === 0) return null;
        const options = group.options.filter((o) => ids.includes(o.id));
        return {
          groupId: group.id,
          groupName: group.name,
          optionIds: ids,
          optionNames: options.map((o) => o.name),
          priceDelta: groupPriceDelta(group, ids),
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);

    addLine({
      itemId: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity,
      notes: notes.trim() || undefined,
      selections: selectionRecords,
    });

    showToast(`${item.name} toegevoegd aan je bestelling`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-charcoal/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        className="absolute inset-x-0 bottom-0 flex max-h-[92vh] flex-col overflow-hidden rounded-t-3xl bg-warm-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:bottom-auto sm:max-h-[85vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="relative">
          <FoodImage label={item.name} item={item} className="aspect-[16/9]" />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-warm-white/90 text-charcoal shadow"
            aria-label="Sluiten"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="flex flex-wrap items-center gap-2">
            {item.popular && <PopularBadge />}
            {item.dietary.map((tag) => (
              <DietaryBadge key={tag} tag={tag} />
            ))}
            {item.spicyLevel ? <SpicyBadge level={item.spicyLevel as 1 | 2 | 3} /> : null}
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold text-forest">{item.name}</h2>
          <p className="mt-1 text-sm text-charcoal/70">{item.description}</p>
          <Price amount={item.price} className="mt-2 block text-lg text-charcoal" />

          <div className="mt-3 rounded-xl border border-border bg-cream/40 px-3.5 py-2.5 text-sm">
            <span className="font-semibold text-charcoal">Allergenen: </span>
            {item.allergens && item.allergens.length > 0 ? (
              <span className="text-charcoal/80">
                {item.allergens.map((a) => allergenLabels[a]).join(", ")}
              </span>
            ) : (
              <span className="text-muted">
                Nog niet bevestigd door de eigenaar — vraag ons ernaar voordat je bestelt.
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-5">
            {(item.modifiers ?? []).map((group) => (
              <fieldset key={group.id} className="flex flex-col gap-2">
                <legend className="flex items-baseline justify-between text-sm font-semibold text-charcoal">
                  <span>
                    {group.name}
                    {group.required && <span className="ml-1 text-red">*</span>}
                  </span>
                  {group.includedSelections != null && (
                    <span className="text-xs font-normal text-muted">
                      {group.includedSelections} gratis, daarna {formatPrice(group.extraSelectionPrice ?? 0)}
                    </span>
                  )}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {group.options.map((option) => {
                    const selected = (selections[group.id] ?? []).includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleOption(group, option.id)}
                        aria-pressed={selected}
                        className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                          selected
                            ? "border-forest bg-forest text-warm-white"
                            : "border-border bg-warm-white text-charcoal hover:border-forest/40"
                        }`}
                      >
                        {option.name}
                        {option.priceDelta > 0 && ` +${formatPrice(option.priceDelta)}`}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="item-notes" className="text-sm font-semibold text-charcoal">
                Opmerking (optioneel)
              </label>
              <textarea
                id="item-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Bijv. zonder ui"
                className="min-h-20 resize-y rounded-xl border border-border bg-warm-white px-4 py-3 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-warm-white px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3 rounded-full border border-border px-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-charcoal hover:bg-charcoal/5"
              aria-label="Minder"
            >
              −
            </button>
            <span className="w-6 text-center font-semibold tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-charcoal hover:bg-charcoal/5"
              aria-label="Meer"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="h-12 flex-1 rounded-full bg-orange text-base font-semibold text-warm-white hover:bg-[#d85f22]"
          >
            Toevoegen · {formatPrice(total)}
          </button>
        </div>
      </div>
    </div>
  );
}
