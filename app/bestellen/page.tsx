import type { Metadata } from "next";
import { categories, items } from "@/data/menu";
import { BestellenView } from "@/components/order/BestellenView";
import { DonerSpit } from "@/components/ui/DonerSpit";

export const metadata: Metadata = {
  title: "Bestellen",
  description: "Stel je bestelling samen bij Fresh & Tasty Dordrecht en reken eenvoudig af.",
  alternates: { canonical: "/bestellen" },
};

export default function BestellenPage() {
  return (
    <div>
      <div className="border-b border-border bg-cream px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-orange">Bestellen</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
              Stel je bestelling samen
            </h1>
          </div>
          <DonerSpit className="hidden h-24 w-auto shrink-0 sm:block" />
        </div>
      </div>
      <BestellenView categories={categories} items={items} />
    </div>
  );
}
