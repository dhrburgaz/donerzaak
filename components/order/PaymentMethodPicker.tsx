"use client";

import type { PaymentMethodId } from "@/types";
import type { PaymentMethodDef } from "@/data/payment-methods";
import { PaymentIcon } from "@/components/ui/PaymentIcons";
import { track } from "@/lib/analytics";

export function PaymentMethodPicker({
  methods,
  value,
  onChange,
}: {
  methods: PaymentMethodDef[];
  value: PaymentMethodId;
  onChange: (id: PaymentMethodId) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Betaalmethode" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {methods.map((method) => {
        const selected = value === method.id;
        return (
          <button
            key={method.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => {
              onChange(method.id);
              track("payment_method_selected", { method: method.id });
            }}
            className={`flex flex-col items-start gap-1.5 rounded-2xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
              selected
                ? "border-forest bg-forest text-warm-white"
                : "border-border bg-warm-white text-charcoal hover:border-forest/40 active:bg-cream/60"
            }`}
          >
            <PaymentIcon method={method.id} />
            <span className="text-sm font-semibold">{method.label}</span>
            <span className={`text-xs ${selected ? "text-warm-white/80" : "text-muted"}`}>
              {method.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
