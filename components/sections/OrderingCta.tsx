import { Button } from "@/components/ui/Button";
import { telHref } from "@/data/navigation";

export function OrderingCta() {
  return (
    <section className="bg-cream">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <h2 className="font-display text-3xl font-bold text-forest sm:text-4xl lg:max-w-md">
          Van trek naar tafel in een paar klikken.
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button href="/bestellen" size="lg">
            Start bestelling
          </Button>
          <Button href={telHref} variant="outline" size="lg">
            Bel direct
          </Button>
        </div>
      </div>
    </section>
  );
}
