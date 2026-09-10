import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Privacybeleid",
  robots: { index: false },
  alternates: { canonical: "/privacybeleid" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-forest sm:text-4xl">Privacybeleid</h1>

      <div className="mt-6 rounded-2xl border border-amber/40 bg-amber/10 px-5 py-4 text-sm font-medium text-[#7a5a0a]">
        Concepttekst. Dit is een placeholder-structuur, geen juridisch
        goedgekeurd privacybeleid. De bestaande website van {business.shortName}{" "}
        bevat mogelijk al een goedgekeurde tekst — kon in deze omgeving niet
        worden opgehaald. Laat deze pagina controleren door de eigenaar (en
        eventueel een jurist) voordat de site live gaat. Zie
        PRODUCTION_CHECKLIST.md.
      </div>

      <div className="prose-content mt-8 flex flex-col gap-6 text-charcoal/85">
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Wie zijn wij</h2>
          <p className="mt-2">
            {business.name} ({business.shortName}), gevestigd aan{" "}
            {business.address.street} {business.address.number},{" "}
            {business.address.postalCode} {business.address.city}, is
            verantwoordelijk voor de verwerking van persoonsgegevens zoals
            beschreven op deze pagina.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Welke gegevens verwerken wij</h2>
          <ul className="mt-2 list-disc pl-5">
            <li>Contactgegevens die je invult bij een (demo)bestelling: naam, telefoonnummer, e-mailadres, adres bij bezorging.</li>
            <li>Gegevens die je invult via het contact- of cateringformulier.</li>
            <li>Je winkelmandje wordt lokaal in je browser opgeslagen (localStorage) en niet naar onze servers verzonden in demo mode.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Waarvoor gebruiken wij gegevens</h2>
          <p className="mt-2">
            Om je bestelling of aanvraag te verwerken en contact met je op te
            nemen. In demo mode wordt niets extern verzonden of opgeslagen.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Bewaartermijn</h2>
          <p className="mt-2">
            Wordt aangevuld zodra een echte order-/CRM-koppeling actief is.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Jouw rechten</h2>
          <p className="mt-2">
            Je hebt het recht op inzage, correctie of verwijdering van je
            persoonsgegevens. Neem hiervoor contact met ons op via{" "}
            {business.phoneDisplay}.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Cookies</h2>
          <p className="mt-2">
            Deze site gebruikt alleen functionele opslag (zoals je
            winkelmandje) totdat eventuele analytics- of kaartintegraties
            worden toegevoegd; die laden pas na toestemming.
          </p>
        </section>
      </div>
    </div>
  );
}
