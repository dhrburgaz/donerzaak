"use client";

import { useMemo, useState } from "react";
import type { MenuCategory, MenuItem } from "@/types";
import { FoodCard } from "@/components/ui/FoodCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function MenuBrowser({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, activeCategory, query]);

  const visibleCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 border-b border-border bg-warm-white/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-forest text-warm-white"
                  : "bg-cream text-charcoal hover:bg-cream/70"
              }`}
            >
              Alles
            </button>
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.slug}`}
                onClick={() => setActiveCategory(category.id)}
                className={`flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-forest text-warm-white"
                    : "bg-cream text-charcoal hover:bg-cream/70"
                }`}
              >
                {category.name}
              </a>
            ))}
          </div>
          <div className="relative lg:w-64">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zoek in het menu…"
              aria-label="Zoek in het menu"
              className="h-11 w-full rounded-full border border-border bg-warm-white px-4 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <EmptyState
            title="Geen gerechten gevonden"
            description="Probeer een andere zoekterm of kies een andere categorie."
          />
        ) : (
          <div className="flex flex-col gap-14">
            {visibleCategories.map((category) => {
              const categoryItems = filteredItems.filter((i) => i.categoryId === category.id);
              if (categoryItems.length === 0) return null;
              return (
                <section key={category.id} id={category.slug} className="scroll-mt-32">
                  <h2 className="font-display text-2xl font-bold text-forest sm:text-3xl">
                    {category.name}
                  </h2>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryItems.map((item) => (
                      <FoodCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
