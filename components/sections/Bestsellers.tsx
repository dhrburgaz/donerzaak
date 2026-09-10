import { getPopularItems } from "@/data/menu";
import { FoodCard } from "@/components/ui/FoodCard";
import { Button } from "@/components/ui/Button";

export function Bestsellers() {
  const items = getPopularItems(6);
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange">
            Favorieten van Dordrecht
          </p>
          <h2 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
            Onze hardlopers
          </h2>
        </div>
        <Button href="/menu" variant="ghost" className="hidden sm:inline-flex">
          Volledig menu →
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <FoodCard key={item.id} item={item} />
        ))}
      </div>
      <Button href="/menu" variant="outline" className="mt-6 w-full sm:hidden">
        Volledig menu
      </Button>
    </section>
  );
}
