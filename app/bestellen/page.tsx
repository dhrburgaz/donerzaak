import type { Metadata } from "next";
import { categories, items } from "@/data/menu";
import { BestellenView } from "@/components/order/BestellenView";

export const metadata: Metadata = {
  title: "Bestellen",
  description: "Stel je bestelling samen bij Fresh & Tasty Dordrecht en reken eenvoudig af.",
  alternates: { canonical: "/bestellen" },
};

export default function BestellenPage() {
  return (
    <div>
      <div className="border-b border-border bg-cream px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">Bestellen</p>
          <h1 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
            Stel je bestelling samen
          </h1>
        </div>
      </div>
      <BestellenView categories={categories} items={items} />
    </div>
  );
}
