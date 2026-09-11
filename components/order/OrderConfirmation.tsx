"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { getOrder, type StoredOrder } from "@/lib/order-history";
import { OrderSummaryCard } from "@/components/order/OrderSummaryCard";
import { StampCard } from "@/components/loyalty/StampCard";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";

export function OrderConfirmation() {
  const searchParams = useSearchParams();
  const [stored, setStored] = useState<StoredOrder | null>(null);
  const [checked, setChecked] = useState(false);

  const orderNumber = searchParams.get("order");
  const total = searchParams.get("total");
  const method = searchParams.get("method");

  useEffect(() => {
    // One-time read of localStorage (an external system) on mount — not
    // derivable during render because it must stay SSR-safe.
    if (orderNumber) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStored(getOrder(orderNumber));
    }
    setChecked(true);
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
        Demo-bestelling — deze bestelling is niet daadwerkelijk verzonden of betaald.
      </div>

      {checked && (
        <div className="mt-8 rounded-2xl border border-border bg-cream/40 p-5">
          {stored ? (
            <OrderSummaryCard order={stored} />
          ) : (
            <div className="flex flex-col gap-3 text-left">
              {method && <p className="text-sm capitalize text-charcoal/80">Methode: {method}</p>}
              {total && (
                <div className="flex justify-between font-display text-base font-bold text-forest">
                  <span>Totaal</span>
                  <span>{formatPrice(Number(total))}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <Button href={`/bestelling/order?order=${orderNumber}`} variant="outline" size="md" className="mt-4">
        Bekijk bestelstatus
      </Button>

      <StampCard className="mt-8 text-left" />

      <div className="mt-8 rounded-2xl border border-border bg-warm-white p-5 text-left shadow-sm sm:p-6">
        <FeedbackForm />
      </div>

      <Button href="/menu" size="lg" className="mt-8">
        Terug naar het menu
      </Button>
    </div>
  );
}
