import type { AllergenCode } from "@/types";

/**
 * The 14 EU-mandated allergen categories, in Dutch. Structured data so
 * allergen info is a real feature (badges, filtering) rather than only
 * free text — see NVWA guidance on allergeneninformatie for unpackaged
 * food sold online. No item in data/menu.demo.ts has these filled in yet:
 * the owner must confirm every product's allergens before they are
 * published. See PRODUCTION_CHECKLIST.md.
 */
export const allergenLabels: Record<AllergenCode, string> = {
  gluten: "Gluten",
  crustaceans: "Schaaldieren",
  eggs: "Eieren",
  fish: "Vis",
  peanuts: "Pinda's",
  soy: "Soja",
  milk: "Melk (lactose)",
  nuts: "Noten",
  celery: "Selderij",
  mustard: "Mosterd",
  sesame: "Sesamzaad",
  sulphites: "Sulfiet",
  lupin: "Lupine",
  molluscs: "Weekdieren",
};
