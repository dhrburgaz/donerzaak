import Link from "next/link";
import { telHref } from "@/data/navigation";
import { business } from "@/data/business";

const actions = [
  { label: "Bestellen", href: "/bestellen", primary: true },
  { label: "Menu", href: "/menu" },
  { label: "Bellen", href: telHref },
  { label: "Route", href: business.mapsUrl || "/contact" },
];

export function QuickActions() {
  return (
    <section aria-label="Snelle acties" className="border-b border-border bg-warm-white">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-2 px-4 py-3 sm:px-6 lg:hidden">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`flex min-h-11 items-center justify-center rounded-xl px-2 py-2 text-center text-sm font-medium ${
              action.primary ? "bg-orange text-warm-white" : "bg-cream text-forest"
            }`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
