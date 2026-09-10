import type { Metadata } from "next";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Algemene voorwaarden",
  robots: { index: false },
  alternates: { canonical: "/algemene-voorwaarden" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-forest sm:text-4xl">
        Algemene voorwaarden
      </h1>

      <div className="mt-6 rounded-2xl border border-amber/40 bg-amber/10 px-5 py-4 text-sm font-medium text-[#7a5a0a]">
        Concepttekst. Dit is een placeholder-structuur, geen juridisch
        goedgekeurde tekst. De bestaande website van {business.shortName} bevat
        mogelijk al goedgekeurde voorwaarden — kon in deze omgeving niet
        worden opgehaald. Laat deze pagina controleren door de eigenaar (en
        eventueel een jurist) voordat de site live gaat. Zie
        PRODUCTION_CHECKLIST.md.
      </div>

      <div className="mt-8 flex flex-col gap-6 text-charcoal/85">
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Toepasselijkheid</h2>
          <p className="mt-2">
            Deze voorwaarden zijn van toepassing op elke bestelling die je
            plaatst bij {business.name}.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Bestellingen</h2>
          <p className="mt-2">
            Deze website draait op dit moment in demo mode. Bestellingen die
            via de site worden geplaatst, worden niet daadwerkelijk naar het
            restaurant verzonden en er wordt geen betaling verwerkt.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Prijzen</h2>
          <p className="mt-2">
            Alle vermelde prijzen zijn in demo mode indicatief en kunnen
            afwijken van de daadwerkelijke prijzen bij {business.shortName}.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Allergenen</h2>
          <p className="mt-2">
            Heb je een allergie? Vraag ons naar de actuele allergeneninformatie
            voordat je bestelt.
          </p>
        </section>
        <section>
          <h2 className="font-display text-xl font-bold text-forest">Contact</h2>
          <p className="mt-2">
            Vragen over deze voorwaarden? Neem contact op via{" "}
            {business.phoneDisplay}.
          </p>
        </section>
      </div>
    </div>
  );
}
