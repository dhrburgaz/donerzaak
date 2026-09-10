import { Button } from "@/components/ui/Button";
import { FoodImage } from "@/components/ui/FoodImage";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest text-warm-white">
      <FoodImage
        label="Fresh & Tasty"
        seed="final-cta"
        className="absolute inset-0 opacity-25"
        textClassName="hidden"
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-5xl">
          Wat wordt jouw bestelling vandaag?
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/bestellen" size="lg">
            Bestel nu
          </Button>
          <Button href="/menu" variant="outline" size="lg" className="border-warm-white/40 text-warm-white hover:border-warm-white">
            Bekijk menu
          </Button>
        </div>
      </div>
    </section>
  );
}
