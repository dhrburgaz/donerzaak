import type { Metadata } from "next";
import { FoodImage } from "@/components/ui/FoodImage";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Fresh & Tasty Dordrecht bereidt dagelijks verse döner, shoarma, grill en pizza voor lunch, diner, afhalen en groepen.",
  alternates: { canonical: "/over-ons" },
};

const points = [
  "Dagelijks vers bereid, geen diepvriesmaaltijden",
  "Kwaliteitsingrediënten, zorgvuldig gekozen",
  "Toegankelijke prijzen voor lunch en diner",
  "Midden in Dordrecht, makkelijk bereikbaar",
  "Snelle service, ook voor grote bestellingen",
  "Gastvrij voor iedereen — alleen, met vrienden of collega's",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">Over ons</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-forest sm:text-5xl">
        Vers eten, gemaakt om te delen
      </h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
        <FoodImage
          label="Fresh & Tasty keuken"
          seed="over-ons"
          className="aspect-[4/3] rounded-3xl"
          textClassName="text-base"
        />
        <div className="flex flex-col gap-4">
          <p className="text-lg text-charcoal/80">
            Fresh &amp; Tasty Dordrecht draait om één ding: vers, smaakvol eten
            dat je energie geeft. Van döner en shoarma tot grillschotels en
            Turkse pizza, alles wordt met zorg bereid — voor lunch, diner,
            afhalen of een grotere groep.
          </p>
          <ul className="flex flex-col gap-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-charcoal/80">
                <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-herb" fill="currentColor" aria-hidden="true">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l4.1 4.1 6.5-6.5a1 1 0 0 1 1.4 0Z" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="/menu" size="md">
              Bekijk menu
            </Button>
            <Button href="/contact" variant="outline" size="md">
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
