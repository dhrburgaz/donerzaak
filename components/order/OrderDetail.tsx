"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getOrder, type StoredOrder } from "@/lib/order-history";
import { OrderSummaryCard } from "@/components/order/OrderSummaryCard";
import { OrderStatusTimeline } from "@/components/order/OrderStatusTimeline";
import { reorderLines } from "@/lib/reorder";
import { useCart } from "@/lib/cart-context";
import { telHref } from "@/data/navigation";
import { business } from "@/data/business";
import { track } from "@/lib/analytics";

export function OrderDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addLine } = useCart();
  const [stored, setStored] = useState<StoredOrder | null>(null);
  const [checked, setChecked] = useState(false);
  const [reorderNotice, setReorderNotice] = useState<string | null>(null);

  const orderNumber = searchParams.get("order");

  useEffect(() => {
    if (orderNumber) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStored(getOrder(orderNumber));
    }
    setChecked(true);
  }, [orderNumber]);

  function handleReorder() {
    if (!stored) return;
    track("reorder_clicked", { orderNumber });
    const { addedCount, skipped } = reorderLines(stored.payload.lines, addLine);
    if (skipped.length > 0) {
      setReorderNotice(
        `${skipped.join(", ")} ${skipped.length === 1 ? "is" : "zijn"} niet meer beschikbaar en ${
          skipped.length === 1 ? "is" : "zijn"
        } overgeslagen.`
      );
    }
    if (addedCount > 0) {
      setTimeout(() => router.push("/bestellen"), skipped.length > 0 ? 1800 : 0);
    }
  }

  if (!checked) return null;

  if (!orderNumber || !stored) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
        <EmptyState
          title="Bestelling niet gevonden"
          description="Deze bestelling kon niet worden gevonden in dit browserprofiel. Bestelgeschiedenis wordt lokaal opgeslagen en is niet beschikbaar op een ander apparaat."
          action={
            <Button href="/menu" size="md">
              Naar het menu
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">Bestelling</p>
      <h1 className="mt-1 font-display text-3xl font-bold text-forest">{orderNumber}</h1>
      <p className="mt-1 text-sm text-charcoal/70">
        Geplaatst op{" "}
        {new Date(stored.createdAt).toLocaleString("nl-NL", {
          dateStyle: "long",
          timeStyle: "short",
        })}
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-warm-white p-5 shadow-sm sm:p-6">
        <h2 className="font-display text-lg font-bold text-forest">Status</h2>
        <div className="mt-4">
          <OrderStatusTimeline createdAt={stored.createdAt} fulfillment={stored.payload.fulfillment} />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-cream/40 p-5 sm:p-6">
        <OrderSummaryCard order={stored} />
      </div>

      {reorderNotice && (
        <p className="mt-4 rounded-xl border border-amber/40 bg-amber/10 px-4 py-3 text-sm font-medium text-[#7a5a0a]" role="status">
          {reorderNotice}
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleReorder} size="lg" className="flex-1">
          Opnieuw bestellen
        </Button>
        <Button href={telHref} variant="outline" size="lg" className="flex-1">
          Bel restaurant · {business.phoneDisplay}
        </Button>
        <Button href="/menu" variant="ghost" size="lg" className="flex-1">
          Bekijk menu
        </Button>
      </div>
    </div>
  );
}
