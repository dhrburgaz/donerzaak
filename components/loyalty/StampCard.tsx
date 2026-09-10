"use client";

import { useHasMounted } from "@/lib/use-has-mounted";
import { getStampCount, STAMPS_REQUIRED, REWARD_DESCRIPTION } from "@/lib/loyalty";
import { FoodIcon } from "@/components/ui/FoodIcons";

export function StampCard({ className = "" }: { className?: string }) {
  const mounted = useHasMounted();
  const count = mounted ? getStampCount() : 0;
  const full = count >= STAMPS_REQUIRED;

  return (
    <div className={`rounded-2xl border border-border bg-warm-white p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-lg font-bold text-forest">Digitale stempelkaart</p>
          <p className="text-sm text-charcoal/70">
            {full
              ? `Kaart vol — ${REWARD_DESCRIPTION}!`
              : `Nog ${STAMPS_REQUIRED - count} bestelling${STAMPS_REQUIRED - count === 1 ? "" : "en"} tot ${REWARD_DESCRIPTION}.`}
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-2.5">
        {Array.from({ length: STAMPS_REQUIRED }, (_, i) => {
          const filled = i < count;
          return (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-full border-2 ${
                filled ? "border-orange bg-orange" : "border-dashed border-border bg-cream/30"
              }`}
              aria-hidden="true"
            >
              {filled && <FoodIcon kind="skewerPlate" className="h-5 w-5" />}
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        Demo: 1 stempel per voltooide demo-bestelling, lokaal opgeslagen in je browser.
      </p>
    </div>
  );
}
