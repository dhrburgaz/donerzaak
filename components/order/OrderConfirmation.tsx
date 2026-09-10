"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { OrderPayload, OrderResult } from "@/types";

type StoredOrder = { payload: OrderPayload; result: OrderResult };

export function OrderConfirmation() {
  const searchParams = useSearchParams();
  const [stored, setStored] = useState<StoredOrder | null>(null);
  const [checked, setChecked] = useState(false);

  const orderNumber = searchParams.get("order");
  const total = searchParams.get("total");
  const method = searchParams.get("method");

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("freshtasty-last-order");
      if (raw) {
        const parsed = JSON.parse(raw) as StoredOrder;
        if (parsed.result.orderNumber === orderNumber) {
          // One-time read of sessionStorage (an external system) on mount —
          // not derivable during render because it must stay SSR-safe.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setStored(parsed);
        }
      }
    } catch {
      // ignore — fall back to URL params below.
    } finally {
      setChecked(true);
    }
  }, [orderNumber]);

  if (!orderNumber) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-forest">Geen bestelling gevonden</h1>
        <p className="mt-2 text-charcoal/70">
          We konden geen recente bestelling vinden. Ga terug naar het menu om opnieuw te bestellen.
        </p>
        <Button href="/menu" size="lg" className="mt-6">
          Naar het menu
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-herb/10 text-herb">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="font-display text-3xl font-bold text-forest">Bestelling ontvangen</h1>
      <p className="mt-2 text-charcoal/70">Bestelnummer</p>
      <p className="font-display text-2xl font-bold tracking-wide text-charcoal">{orderNumber}</p>

      <div className="mt-6 rounded-2xl border border-amber/40 bg-amber/10 px-5 py-4 text-sm font-medium text-[#7a5a0a]">
        Demo: deze bestelling is niet naar het restaurant verzonden.
      </div>

      {checked && (
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border bg-cream/40 p-5 text-left">
          {stored ? (
            <>
              <ul className="flex flex-col gap-2 text-sm">
                {stored.payload.lines.map((line) => (
                  <li key={line.lineId} className="flex justify-between gap-3">
                    <span className="text-charcoal/80">
                      {line.quantity}× {line.name}
                    </span>
                    <span className="shrink-0 tabular-nums text-charcoal">
                      {formatPrice(line.unitPrice * line.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between border-t border-border pt-3 text-sm text-charcoal/80">
                <span>Methode</span>
                <span className="capitalize">
                  {stored.payload.fulfillment} · {stored.payload.paymentMethod}
                </span>
              </div>
            </>
          ) : (
            method && <p className="text-sm capitalize text-charcoal/80">Methode: {method}</p>
          )}
          {total && (
            <div className="flex justify-between font-display text-base font-bold text-forest">
              <span>Totaal</span>
              <span>{formatPrice(Number(total))}</span>
            </div>
          )}
        </div>
      )}

      <Button href="/menu" size="lg" className="mt-8">
        Terug naar het menu
      </Button>
    </div>
  );
}
