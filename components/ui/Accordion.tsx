"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="flex flex-col divide-y divide-border rounded-2xl border border-border bg-warm-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-button-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question}>
            <button
              id={buttonId}
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-charcoal">{item.question}</span>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-forest transition-transform ${open ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open && (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="px-5 pb-4 text-sm text-charcoal/75">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
