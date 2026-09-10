import { business } from "@/data/business";
import { Button } from "@/components/ui/Button";
import { OpeningStatus } from "@/components/ui/OpeningStatus";
import { telHref } from "@/data/navigation";
import { FoodImage } from "@/components/ui/FoodImage";

export function LocationSection() {
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
  ].filter(Boolean) as string[];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <FoodImage
          label="Fresh & Tasty Dordrecht"
          seed="location"
          className="aspect-[4/3] rounded-3xl lg:aspect-[5/4]"
          textClassName="text-base"
        />
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">Bezoek ons</p>
          <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
            Fresh &amp; Tasty Dordrecht
          </h2>
          <p className="text-charcoal/80">{fullAddress}</p>
          <OpeningStatus className="text-sm font-medium text-charcoal" />
          {facilities.length > 0 && (
            <ul className="flex flex-wrap gap-2 text-sm text-charcoal/70">
              {facilities.map((f) => (
                <li key={f} className="rounded-full bg-cream px-3 py-1">
                  {f}
                </li>
              ))}
            </ul>
          )}
          {attrs.parkingNote && (
            <p className="text-sm text-muted">{attrs.parkingNote}</p>
          )}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href={mapsUrl} size="md">
              Route plannen
            </Button>
            <Button href={telHref} variant="outline" size="md">
              Bel direct
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
