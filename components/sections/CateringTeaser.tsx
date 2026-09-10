import { Button } from "@/components/ui/Button";
import { FoodImage } from "@/components/ui/FoodImage";

const segments = ["Bedrijven", "Scholen", "Vergaderingen", "Teams", "Verjaardagen", "Evenementen"];

export function CateringTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 overflow-hidden rounded-3xl bg-charcoal lg:grid-cols-2">
        <div className="flex flex-col gap-5 p-8 text-warm-white sm:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber">Catering</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Catering in Dordrecht die iedereen blij maakt.
          </h2>
          <ul className="flex flex-wrap gap-2 text-sm text-warm-white/80">
            {segments.map((s) => (
              <li key={s} className="rounded-full border border-warm-white/20 px-3 py-1">
                {s}
              </li>
            ))}
          </ul>
          <Button href="/catering" size="lg" className="mt-2 w-fit">
            Vraag catering aan
          </Button>
        </div>
        <FoodImage
          label="Catering schotels"
          icon="skewerPlate"
          seed="catering-teaser"
          className="min-h-[220px] lg:min-h-full"
          textClassName="text-base"
        />
      </div>
    </section>
  );
}
