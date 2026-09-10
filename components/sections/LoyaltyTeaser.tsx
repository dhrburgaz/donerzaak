import { StampCard } from "@/components/loyalty/StampCard";
import { Button } from "@/components/ui/Button";

export function LoyaltyTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-3xl bg-cream/50 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">Loyaliteit</p>
          <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl">
            Elke bestelling een stempel dichterbij korting.
          </h2>
          <p className="text-charcoal/75">
            Bestel via de site en spaar automatisch voor een beloning — geen
            account nodig.
          </p>
          <Button href="/bestellen" size="md" className="mt-2 w-fit">
            Begin met sparen
          </Button>
        </div>
        <StampCard />
      </div>
    </section>
  );
}
