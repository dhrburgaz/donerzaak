import type { Metadata } from "next";
import { CateringForm } from "@/components/catering/CateringForm";
import { FoodImage } from "@/components/ui/FoodImage";
import { telHref } from "@/data/navigation";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Catering",
  description:
    "Catering in Dordrecht voor bedrijven, scholen, teamdagen en evenementen. Vraag vrijblijvend een offerte aan bij Fresh & Tasty.",
  alternates: { canonical: "/catering" },
};

const segments = [
  { label: "Bedrijfslunch", description: "Vers en makkelijk delen op kantoor." },
  { label: "Vergadering", description: "Kleine gerechtjes en broodjes voor tussendoor." },
  { label: "School / opleiding", description: "Betaalbaar en geschikt voor grote groepen." },
  { label: "Teamdag", description: "Grillschotels om samen van te genieten." },
  { label: "Verjaardag", description: "Feestelijke platters op maat." },
  { label: "Evenement", description: "Flexibel voor grotere aantallen." },
];

export default function CateringPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-forest text-warm-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber">Catering</p>
            <h1 className="mt-1 font-display text-4xl font-bold sm:text-5xl">
              Catering in Dordrecht die iedereen blij maakt.
            </h1>
            <p className="mt-4 max-w-md text-warm-white/80">
              Van bedrijfslunch tot verjaardag: wij verzorgen vers eten voor
              jouw groep. Vraag vrijblijvend een aanbod aan.
            </p>
            <a href={telHref} className="mt-4 inline-block text-sm font-medium text-amber underline underline-offset-2">
              Liever direct bellen? {business.phoneDisplay}
            </a>
          </div>
          <FoodImage
            label="Catering — voorbeeld"
            icon="skewerPlate"
            seed="catering-hero"
            className="aspect-[4/3] rounded-3xl"
            textClassName="text-base"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-forest sm:text-3xl">Voor elke gelegenheid</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {segments.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-cream/40 p-5">
              <p className="font-semibold text-forest">{s.label}</p>
              <p className="mt-1 text-sm text-charcoal/70">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-cream/40">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-forest sm:text-3xl">
            Vraag catering aan
          </h2>
          <p className="mt-2 text-charcoal/70">
            Vul het formulier in en we nemen zo snel mogelijk contact met je op.
          </p>
          <div className="mt-8 rounded-3xl border border-border bg-warm-white p-6 shadow-sm sm:p-8">
            <CateringForm />
          </div>
        </div>
      </section>
    </div>
  );
}
