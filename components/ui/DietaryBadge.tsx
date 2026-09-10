import type { DietaryTag } from "@/types";

const labels: Record<DietaryTag, string> = {
  "halal-option": "Halal optie",
  vegetarian: "Vegetarisch",
  vegan: "Vegan",
};

const styles: Record<DietaryTag, string> = {
  "halal-option": "bg-herb/10 text-herb",
  vegetarian: "bg-amber/20 text-[#7a5a0a]",
  vegan: "bg-herb/15 text-forest",
};

export function DietaryBadge({ tag }: { tag: DietaryTag }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${styles[tag]}`}
    >
      {labels[tag]}
    </span>
  );
}

export function PopularBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-warm-white">
      Populair
    </span>
  );
}

export function SpicyBadge({ level }: { level: 1 | 2 | 3 }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full bg-red/10 px-2.5 py-1 text-xs font-medium text-red"
      aria-label={`Pittigheid ${level} van 3`}
    >
      Pittig
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`h-1.5 w-1.5 rounded-full ${n <= level ? "bg-red" : "bg-red/25"}`}
          />
        ))}
      </span>
    </span>
  );
}
