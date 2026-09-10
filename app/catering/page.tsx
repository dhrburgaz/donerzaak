import type { Metadata } from "next";
import { CateringForm } from "@/components/catering/CateringForm";
import { FoodImage } from "@/components/ui/FoodImage";
import { Accordion } from "@/components/ui/Accordion";
import { telHref } from "@/data/navigation";
import { business } from "@/data/business";

const faqItems = [
  {
    question: "Hoeveel dagen van tevoren moet ik catering aanvragen?",
    answer:
      "Vraag het liefst minimaal 2 werkdagen van tevoren aan, zodat we genoeg tijd hebben om vers te bereiden. Voor grotere groepen (50+ personen) adviseren we minimaal 5 werkdagen.",
  },
  {
    question: "Wat is het minimumaantal personen voor catering?",
    answer:
      "Vanaf 8 personen kunnen we een cateringbestelling verzorgen. Voor kleinere groepen kun je gewoon via de normale bestelpagina bestellen.",
  },
  {
    question: "Houden jullie rekening met allergieën of dieetwensen?",
    answer:
      "Ja, geef dit duidelijk aan in het opmerkingenveld van het aanvraagformulier. Vermeld ook altijd eventuele allergieën mondeling bij het ophalen of afleveren, zodat we dit kunnen bevestigen.",
  },
  {
    question: "Bezorgen jullie ook buiten Dordrecht?",
    answer:
      "Dat hangt af van de afstand en groepsgrootte. Geef je locatie door in de aanvraag, dan laten we je weten of bezorging mogelijk is en wat de kosten zijn.",
  },
  {
    question: "Hoe werkt betalen bij catering?",
    answer:
      "Na je aanvraag nemen we contact op om de bestelling en prijs te bevestigen. Betaling regelen we in overleg, meestal contant of per overschrijving bij ophalen/levering.",
  },
  {
    question: "Kan ik een cateringaanvraag nog wijzigen of annuleren?",
    answer:
      "Neem zo snel mogelijk telefonisch contact met ons op als er iets wijzigt. Hoe eerder je dit laat weten, hoe beter we hierop kunnen inspelen.",
  },
];

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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function CateringPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-forest sm:text-3xl">
          Veelgestelde vragen over catering
        </h2>
        <div className="mt-6">
          <Accordion items={faqItems} />
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
