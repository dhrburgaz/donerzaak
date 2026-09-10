import type { Metadata } from "next";
import { business } from "@/data/business";
import { telHref } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { OpeningStatus } from "@/components/ui/OpeningStatus";
import { ContactForm } from "@/components/contact/ContactForm";
import { FoodImage } from "@/components/ui/FoodImage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Fresh & Tasty Dordrecht: telefoon, adres, openingstijden en route.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const addr = business.address;
  const fullAddress = `${addr.street} ${addr.number}, ${addr.postalCode} ${addr.city}`;
  const mapsUrl =
    business.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  const attrs = business.attributes;

  const facilities = [
    attrs.wheelchairAccessibleEntrance && "Rolstoeltoegankelijke ingang",
    attrs.wheelchairAccessibleSeating && "Rolstoeltoegankelijke zitplaatsen",
    attrs.freeWifi ? "Gratis wifi" : attrs.wifi && "Wifi",
    attrs.contactlessPayment && "Contactloos betalen",
    attrs.kidsMenu && "Kindermenu",
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">Contact</p>
      <h1 className="mt-1 font-display text-4xl font-bold text-forest sm:text-5xl">
        Kom langs of neem contact op
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div>
            <FoodImage
              label="Kaartweergave — open in Google Maps"
              icon="storefront"
              seed="contact-map"
              className="aspect-[4/3] rounded-3xl"
              textClassName="text-sm"
            />
            <p className="mt-2 text-xs text-muted">
              Lichte kaartvoorbeeld. We laden Google Maps pas na een klik, zodat er geen
              trackers worden geladen voordat je dat wilt.
            </p>
          </div>

          <dl className="flex flex-col gap-4 rounded-2xl border border-border bg-cream/40 p-6">
            <div>
              <dt className="text-sm font-semibold text-charcoal">Adres</dt>
              <dd className="text-charcoal/80">{fullAddress}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-charcoal">Telefoon</dt>
              <dd>
                <a href={telHref} className="text-orange underline underline-offset-2">
                  {business.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-charcoal">Openingstijden</dt>
              <dd>
                <OpeningStatus className="text-charcoal/80" />
              </dd>
            </div>
            {facilities.length > 0 && (
              <div>
                <dt className="text-sm font-semibold text-charcoal">Voorzieningen</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {facilities.map((f) => (
                    <span key={f} className="rounded-full bg-warm-white px-3 py-1 text-sm text-charcoal/80">
                      {f}
                    </span>
                  ))}
                </dd>
              </div>
            )}
            {attrs.parkingNote && (
              <div>
                <dt className="text-sm font-semibold text-charcoal">Parkeren</dt>
                <dd className="text-sm text-charcoal/70">{attrs.parkingNote}</dd>
              </div>
            )}
          </dl>

          <div className="flex flex-wrap gap-3">
            <Button href="/bestellen" size="lg">
              Bestel nu
            </Button>
            <Button href={mapsUrl} variant="outline" size="lg">
              Route plannen
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-warm-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-forest">Stuur ons een bericht</h2>
          <p className="mt-1 text-sm text-charcoal/70">
            Liever bellen? Dat kan ook: {business.phoneDisplay}.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
