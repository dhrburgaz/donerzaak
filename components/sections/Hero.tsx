import { Button } from "@/components/ui/Button";
import { FoodImage } from "@/components/ui/FoodImage";
import { OpeningStatus } from "@/components/ui/OpeningStatus";
import { FoodIcon } from "@/components/ui/FoodIcons";

const trustPoints = ["Vers bereid", "Halal opties", "Vega & vegan opties", "Dordrecht"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-herb/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-amber/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-20 lg:px-8">
        <div className="flex flex-col gap-6">
          <OpeningStatus className="inline-flex items-center gap-1.5 self-start rounded-full bg-warm-white px-3 py-1.5 text-sm font-medium text-charcoal shadow-sm" />
          <h1 className="font-display text-[clamp(2.5rem,6vw+1rem,4.5rem)] font-bold leading-[0.98] tracking-tight text-forest">
            Vers van de grill.
            <br />
            Recht naar{" "}
            <span className="relative inline-block text-orange">
              jouw tafel.
              <svg
                className="absolute -bottom-1 left-0 w-full text-amber"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9c40-8 156-8 196 0"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
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
              item={{ name: "Kapsalon Shoarma", categoryId: "kapsalon" }}
              className="col-span-2 aspect-[16/10] rounded-3xl shadow-xl shadow-forest/10"
              textClassName="text-base"
            />
            <FoodImage
              label="Dürüm Adana"
              item={{ name: "Dürüm Adana", categoryId: "durum" }}
              className="aspect-square rounded-2xl shadow-lg shadow-forest/10"
            />
            <FoodImage
              label="Turkse Pizza Mix"
              item={{ name: "Turkse Pizza Mix", categoryId: "turkse-pizza" }}
              className="aspect-square rounded-2xl shadow-lg shadow-forest/10"
            />
          </div>

          <div className="absolute -left-4 -top-4 flex items-center gap-2 rounded-2xl bg-warm-white px-3 py-2.5 shadow-lg sm:-left-6 sm:-top-6">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange">
              <FoodIcon kind="skewerPlate" className="h-6 w-6" />
            </span>
            <span className="text-xs font-semibold leading-tight text-charcoal">
              Elke dag
              <br />
              vers van de grill
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
