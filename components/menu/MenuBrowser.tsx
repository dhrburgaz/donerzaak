"use client";

import { useMemo, useState } from "react";
import type { DietaryTag, MenuCategory, MenuItem } from "@/types";
import { FoodCard } from "@/components/ui/FoodCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCategoryGradient } from "@/lib/category-colors";
import { matchesSearch } from "@/lib/menu-search";
import { useFavorites } from "@/lib/favorites";

type SortOption = "aanbevolen" | "prijs-op" | "prijs-af" | "populair";

const dietaryFilterOptions: { tag: DietaryTag; label: string }[] = [
  { tag: "vegetarian", label: "Vegetarisch" },
  { tag: "vegan", label: "Vegan" },
  { tag: "halal-option", label: "Halal optie" },
];

export function MenuBrowser({
  categories,
  items,
}: {
  categories: MenuCategory[];
  items: MenuItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [dietaryFilters, setDietaryFilters] = useState<Set<DietaryTag>>(new Set());
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("aanbevolen");
  const { favorites } = useFavorites();

  function toggleDietary(tag: DietaryTag) {
    setDietaryFilters((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  const hasActiveRefinement =
    query.trim().length > 0 ||
    dietaryFilters.size > 0 ||
    spicyOnly ||
    popularOnly ||
    favoritesOnly ||
    sortBy !== "aanbevolen";

  const filteredItems = useMemo(() => {
    let result = items.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.categoryId === activeCategory;
      const matchesDietary =
        dietaryFilters.size === 0 || [...dietaryFilters].every((tag) => item.dietary.includes(tag));
      const matchesSpicy = !spicyOnly || (item.spicyLevel ?? 0) > 0;
      const matchesPopular = !popularOnly || item.popular === true;
      const matchesFavorite = !favoritesOnly || favorites.has(item.id);
      return (
        matchesCategory &&
        matchesSearch(item, query) &&
        matchesDietary &&
        matchesSpicy &&
        matchesPopular &&
        matchesFavorite
      );
    });

    if (sortBy === "prijs-op") result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "prijs-af") result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "populair")
      result = [...result].sort((a, b) => Number(b.popular ?? false) - Number(a.popular ?? false));

    return result;
  }, [items, activeCategory, query, dietaryFilters, spicyOnly, popularOnly, favoritesOnly, sortBy, favorites]);

  const visibleCategories =
    activeCategory === "all" ? categories : categories.filter((c) => c.id === activeCategory);

  const filterChipClass = (active: boolean) =>
    `flex min-h-9 shrink-0 items-center rounded-full border px-3.5 text-sm font-medium transition-colors ${
      active ? "border-forest bg-forest text-warm-white" : "border-border bg-warm-white text-charcoal hover:border-forest/40"
    }`;

  return (
    <div>
      <div className="sticky top-16 z-30 border-b border-border bg-warm-white/95 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 gap-2 overflow-x-auto pb-1 pr-4 [scrollbar-width:none] [-ms-overflow-style:none] sm:pr-6 lg:pr-8 [&::-webkit-scrollbar]:hidden">
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
            {categories.map((category) => {
              const [accent] = getCategoryGradient(category.id);
              const active = activeCategory === category.id;
              return (
                <a
                  key={category.id}
                  href={`#${category.slug}`}
                  onClick={() => setActiveCategory(category.id)}
                  style={{ backgroundColor: active ? accent : `${accent}1F` }}
                  className={`flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
                    active ? "text-warm-white shadow-sm" : "text-charcoal hover:brightness-95"
                  }`}
                >
                  {!active && (
                    <span aria-hidden="true" className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  )}
                  {category.name}
                </a>
              );
            })}
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

        <div className="mx-auto mt-3 flex max-w-7xl flex-wrap items-center gap-2">
          {dietaryFilterOptions.map(({ tag, label }) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleDietary(tag)}
              aria-pressed={dietaryFilters.has(tag)}
              className={filterChipClass(dietaryFilters.has(tag))}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSpicyOnly((v) => !v)}
            aria-pressed={spicyOnly}
            className={filterChipClass(spicyOnly)}
          >
            Pittig
          </button>
          <button
            type="button"
            onClick={() => setPopularOnly((v) => !v)}
            aria-pressed={popularOnly}
            className={filterChipClass(popularOnly)}
          >
            Populair
          </button>
          <button
            type="button"
            onClick={() => setFavoritesOnly((v) => !v)}
            aria-pressed={favoritesOnly}
            className={filterChipClass(favoritesOnly)}
          >
            Mijn favorieten
          </button>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sorteren"
            className="ml-auto h-9 rounded-full border border-border bg-warm-white px-3 text-sm text-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
          >
            <option value="aanbevolen">Aanbevolen</option>
            <option value="prijs-op">Prijs laag-hoog</option>
            <option value="prijs-af">Prijs hoog-laag</option>
            <option value="populair">Populair eerst</option>
          </select>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <EmptyState
            title="Geen gerechten gevonden"
            description="Probeer een andere zoekterm, filter of categorie."
          />
        ) : hasActiveRefinement ? (
          <div>
            <p className="mb-5 text-sm font-medium text-muted">
              {filteredItems.length} gerecht{filteredItems.length === 1 ? "" : "en"} gevonden
            </p>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item, i) => (
                <FoodCard key={item.id} item={item} tiltIndex={i} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-14">
            {visibleCategories.map((category) => {
              const categoryItems = filteredItems.filter((i) => i.categoryId === category.id);
              if (categoryItems.length === 0) return null;
              const [accent] = getCategoryGradient(category.id);
              return (
                <section key={category.id} id={category.slug} className="scroll-mt-32">
                  <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-forest sm:text-3xl">
                    <span
                      aria-hidden="true"
                      className="h-7 w-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {category.name}
                  </h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {categoryItems.map((item, i) => (
                      <FoodCard key={item.id} item={item} tiltIndex={i} />
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
