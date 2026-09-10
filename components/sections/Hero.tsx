import { Button } from "@/components/ui/Button";
import { FoodImage } from "@/components/ui/FoodImage";
import { OpeningStatus } from "@/components/ui/OpeningStatus";

const trustPoints = ["Vers bereid", "Halal opties", "Vega & vegan opties", "Dordrecht"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20 lg:px-8">
        <div className="flex flex-col gap-6">
          <OpeningStatus className="inline-flex items-center gap-1.5 self-start rounded-full bg-warm-white px-3 py-1.5 text-sm font-medium text-charcoal shadow-sm" />
          <h1 className="font-display text-[clamp(2.25rem,5vw+1rem,3.75rem)] font-bold leading-[1.05] tracking-tight text-forest">
            Vers van de grill.
            <br />
            Recht naar jouw tafel.
          </h1>
          <p className="max-w-md text-lg text-charcoal/80">
            Döner, shoarma, grill en Turkse pizza, elke dag vers bereid in
            Dordrecht. Bestel online voor afhalen of kom gezellig langs.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/bestellen" size="lg">
              Bestel nu
            </Button>
            <Button href="/menu" variant="outline" size="lg">
              Bekijk menu
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2 text-sm font-medium text-charcoal/70">
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-herb" fill="currentColor" aria-hidden="true">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l4.1 4.1 6.5-6.5a1 1 0 0 1 1.4 0Z" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            <FoodImage
              label="Kapsalon Shoarma"
              seed="hero-1"
              className="col-span-2 aspect-[16/10] rounded-3xl"
              textClassName="text-base"
            />
            <FoodImage label="Dürüm Adana" seed="hero-2" className="aspect-square rounded-2xl" />
            <FoodImage label="Turkse Pizza Mix" seed="hero-3" className="aspect-square rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
