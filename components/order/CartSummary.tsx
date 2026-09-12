"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { Price } from "@/components/ui/Price";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { track } from "@/lib/analytics";
import { CartUpsells } from "@/components/order/CartUpsells";
import { findUnavailableLines } from "@/lib/cart-availability";

export function CartSummary({ onCheckout }: { onCheckout?: () => void }) {
  const { lines, removeLine, setQuantity, subtotal, lineTotal, hydrated } = useCart();

  if (!hydrated) return null;

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Je bestelling is nog leeg"
        description="Voeg gerechten toe via het menu om te beginnen."
      />
    );
  }

  const unavailable = findUnavailableLines(lines);
  const unavailableIds = new Set(unavailable.map((u) => u.line.lineId));

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      {/* Scrollable region — the checkout CTA below stays pinned and visible
          even when the order has enough lines to overflow the sticky
          sidebar/drawer height (was reachable only via full-page scroll). */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {unavailable.length > 0 && (
          <div role="alert" className="mb-3 rounded-xl border border-red/30 bg-red/5 p-3 text-sm">
            <p className="font-semibold text-red">
              {unavailable.length === 1
                ? "Eén product in je bestelling is niet meer beschikbaar."
                : `${unavailable.length} producten in je bestelling zijn niet meer beschikbaar.`}
            </p>
            <p className="mt-1 text-charcoal/70">Verwijder ze om verder te kunnen afrekenen.</p>
            <button
              type="button"
              onClick={() => unavailable.forEach((u) => removeLine(u.line.lineId))}
              className="mt-2 text-xs font-semibold text-red underline underline-offset-2 hover:text-[#a53b26]"
            >
              Alle niet-beschikbare items verwijderen
            </button>
          </div>
        )}
        <ul className="flex flex-col divide-y divide-border">
          {lines.map((line) => (
            <li key={line.lineId} className="flex gap-3 py-4">
              <div className="flex-1">
                <p className="font-semibold text-charcoal">
                  {line.name}
                  {unavailableIds.has(line.lineId) && (
                    <span className="ml-2 rounded-full bg-red/10 px-2 py-0.5 text-xs font-semibold text-red">
                      Niet meer beschikbaar
                    </span>
                  )}
                </p>
                {line.selections.length > 0 && (
                  <p className="mt-0.5 text-xs text-muted">
                    {line.selections.map((s) => s.optionNames.join(", ")).join(" · ")}
                  </p>
                )}
                {line.notes && <p className="mt-0.5 text-xs italic text-muted">“{line.notes}”</p>}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-2 rounded-full border border-border px-1">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.lineId, line.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
                      aria-label={`Minder ${line.name}`}
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold tabular-nums">
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.lineId, line.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal hover:bg-charcoal/5"
                      aria-label={`Meer ${line.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLine(line.lineId)}
                    className="text-xs font-medium text-muted underline underline-offset-2 hover:text-red"
                  >
                    Verwijderen
                  </button>
                </div>
              </div>
              <Price amount={lineTotal(line)} className="shrink-0 text-sm text-charcoal" />
            </li>
          ))}
        </ul>

        <CartUpsells lines={lines} />
      </div>

      <div className="flex shrink-0 flex-col gap-4">
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="font-semibold text-charcoal">Subtotaal</span>
          <span className="font-display text-lg font-bold text-forest">{formatPrice(subtotal)}</span>
        </div>

        {onCheckout ? (
          <Button
            onClick={() => {
              track("checkout_started");
              onCheckout();
            }}
            disabled={unavailable.length > 0}
            size="lg"
          >
            Naar afrekenen · {formatPrice(subtotal)}
          </Button>
        ) : unavailable.length > 0 ? (
          <Button size="lg" disabled>
            Naar afrekenen · {formatPrice(subtotal)}
          </Button>
        ) : (
          <Button href="/checkout" size="lg" onClick={() => track("checkout_started")}>
            Naar afrekenen · {formatPrice(subtotal)}
          </Button>
        )}
        <Link href="/menu" className="text-center text-sm text-muted underline underline-offset-2">
          Verder bestellen
        </Link>
      </div>
    </div>
  );
}
