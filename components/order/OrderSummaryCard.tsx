import { formatPrice } from "@/lib/format";
import { paymentMethods } from "@/data/payment-methods";
import type { StoredOrder } from "@/lib/order-history";

export function OrderSummaryCard({ order }: { order: StoredOrder }) {
  const { payload } = order;
  const paymentLabel = paymentMethods.find((m) => m.id === payload.paymentMethod)?.label ?? payload.paymentMethod;

  return (
    <div className="flex flex-col gap-3 text-left">
      <ul className="flex flex-col gap-2 text-sm">
        {payload.lines.map((line) => (
          <li key={line.lineId} className="flex justify-between gap-3">
            <span className="text-charcoal/80">
              {line.quantity}× {line.name}
              {line.selections.length > 0 && (
                <span className="block text-xs text-muted">
                  {line.selections.map((s) => s.optionNames.join(", ")).join(" · ")}
                </span>
              )}
            </span>
            <span className="shrink-0 tabular-nums text-charcoal">
              {formatPrice(line.unitPrice * line.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-1.5 border-t border-border pt-3 text-sm text-charcoal/80">
        <div className="flex justify-between">
          <span>Ontvangst</span>
          <span className="capitalize">{payload.fulfillment}</span>
        </div>
        <div className="flex justify-between">
          <span>Tijd</span>
          <span>{payload.requestedTime === "asap" ? "Zo snel mogelijk" : payload.requestedTime}</span>
        </div>
        {payload.address && (
          <div className="flex justify-between gap-4">
            <span>Adres</span>
            <span className="text-right">
              {payload.address.street} {payload.address.number}
              {payload.address.addition ? `-${payload.address.addition}` : ""}, {payload.address.postalCode}{" "}
              {payload.address.city}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Contact</span>
          <span>
            {payload.contact.name} · {payload.contact.phone}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Betaalmethode</span>
          <span>
            {paymentLabel} ({order.payment.status === "pending" ? "bij ontvangst" : "betaald"})
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 border-t border-border pt-3 text-sm">
        <div className="flex justify-between text-charcoal/80">
          <span>Subtotaal</span>
          <span>{formatPrice(payload.subtotal)}</span>
        </div>
        {payload.discount && (
          <div className="flex justify-between text-herb">
            <span>Coupon {payload.discount.code}</span>
            <span>−{formatPrice(payload.discount.discountAmount)}</span>
          </div>
        )}
        {payload.deliveryFee > 0 && (
          <div className="flex justify-between text-charcoal/80">
            <span>Bezorgkosten</span>
            <span>{formatPrice(payload.deliveryFee)}</span>
          </div>
        )}
        {payload.tip > 0 && (
          <div className="flex justify-between text-charcoal/80">
            <span>Fooi</span>
            <span>{formatPrice(payload.tip)}</span>
          </div>
        )}
        <div className="flex justify-between pt-1 font-display text-base font-bold text-forest">
          <span>Totaal</span>
          <span>{formatPrice(payload.total)}</span>
        </div>
      </div>
    </div>
  );
}
