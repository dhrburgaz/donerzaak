import type { Metadata } from "next";
import { categories, items } from "@/data/menu";
import { MenuBrowser } from "@/components/menu/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Bekijk het volledige menu van Fresh & Tasty Dordrecht: kapsalon, dürüm, broodjes, Turkse pizza, grillschotels, pizza en meer.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <div>
      <div className="border-b border-border bg-cream px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">Menu</p>
          <h1 className="mt-1 font-display text-4xl font-bold text-forest sm:text-5xl">
            Ons volledige menu
          </h1>
          <p className="mt-2 max-w-xl text-charcoal/75">
            Alle gerechten worden vers bereid. Vraag ons naar allergenen.
          </p>
        </div>
      </div>
      <MenuBrowser categories={categories} items={items} />
    </div>
  );
}
