import Link from "next/link";
import { menuCategories } from "@/data/menu.demo";
import { FoodImage } from "@/components/ui/FoodImage";

const featured = [
  "kapsalon",
  "durum",
  "broodjes",
  "turkse-pizza",
  "grill",
  "pizza",
];

export function MenuTeaser() {
  const categories = featured
    .map((id) => menuCategories.find((c) => c.id === id))
    .filter((c): c is NonNullable<typeof c> => !!c);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-orange">Ons menu</p>
      <h2 className="mt-1 font-display text-3xl font-bold text-forest sm:text-4xl">
        Van kapsalon tot Turkse pizza
      </h2>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/menu#${category.slug}`}
            className="group flex flex-col gap-2"
          >
            <FoodImage
              label={category.name}
              seed={category.id}
              className="aspect-square rounded-2xl transition-transform group-hover:scale-[1.03]"
              textClassName="text-sm"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
