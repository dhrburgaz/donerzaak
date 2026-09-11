"use client";

import { useEffect, useState } from "react";
import type { FulfillmentMethod } from "@/types";
import { orderingConfig } from "@/data/ordering-config";

const STAGES = [
  "Bestelling ontvangen",
  "In voorbereiding",
  "Bijna klaar",
  "Onderweg / Klaar om af te halen",
  "Afgerond",
];

function currentStage(createdAt: string, fulfillment: FulfillmentMethod, now: number): number {
  const [min, max] = fulfillment === "bezorgen" ? orderingConfig.estimatedDeliveryMinutes : orderingConfig.estimatedPickupMinutes;
  const estimatedMs = ((min + max) / 2) * 60_000;
  const elapsedMs = now - new Date(createdAt).getTime();
  const fraction = estimatedMs > 0 ? elapsedMs / estimatedMs : 1;

  if (fraction < 0.1) return 0;
  if (fraction < 0.4) return 1;
  if (fraction < 0.75) return 2;
  if (fraction < 1) return 3;
  return 4;
}

export function OrderStatusTimeline({
  createdAt,
  fulfillment,
}: {
  createdAt: string;
  fulfillment: FulfillmentMethod;
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const stage = currentStage(createdAt, fulfillment, now);

  return (
    <div>
      <ol className="flex flex-col gap-0">
        {STAGES.map((label, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <li key={label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? "bg-herb text-warm-white"
                      : active
                        ? "bg-orange text-warm-white"
                        : "bg-cream text-muted"
                  }`}
                  aria-hidden="true"
                >
                  {done ? "✓" : i + 1}
                </span>
                {i < STAGES.length - 1 && (
                  <span className={`w-0.5 flex-1 ${done ? "bg-herb" : "bg-border"}`} style={{ minHeight: "1.25rem" }} />
                )}
              </div>
              <p className={`pb-5 text-sm ${active ? "font-semibold text-forest" : done ? "text-charcoal/70" : "text-muted"}`}>
                {label}
              </p>
            </li>
          );
        })}
      </ol>
      <p className="text-xs text-muted">
        Demo: dit toont een gesimuleerde voortgang op basis van verstreken tijd, geen live koppeling met de keuken.
      </p>
    </div>
  );
}
