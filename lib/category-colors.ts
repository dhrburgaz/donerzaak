/**
 * Shared category → color mapping. Single source so FoodImage cards and
 * the menu category chip nav stay visually in sync.
 */
export const categoryPalette: Record<string, [string, string]> = {
  kapsalon: ["#E96B2C", "#C94B32"],
  durum: ["#2E7D5B", "#173F32"],
  broodjes: ["#F4B740", "#E96B2C"],
  "turkse-pizza": ["#C94B32", "#7a2c1c"],
  grill: ["#173F32", "#3a1610"],
  pizza: ["#E96B2C", "#9c2f1f"],
  burgers: ["#C94B32", "#E96B2C"],
  vegetarisch: ["#2E7D5B", "#0f2e24"],
  kindermenu: ["#F4B740", "#E96B2C"],
  bijgerechten: ["#2E7D5B", "#F4B740"],
  sauzen: ["#76756F", "#3a3a36"],
  dranken: ["#173F32", "#2E7D5B"],
  "dessert-koffie": ["#7a2c1c", "#C94B32"],
};

export const fallbackPalette: [string, string][] = [
  ["#2E7D5B", "#173F32"],
  ["#E96B2C", "#C94B32"],
  ["#F4B740", "#E96B2C"],
  ["#173F32", "#2E7D5B"],
];

export function hashString(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash;
}

export function getCategoryGradient(categoryId?: string, seed?: string): [string, string] {
  if (categoryId && categoryPalette[categoryId]) return categoryPalette[categoryId];
  return fallbackPalette[hashString(seed ?? categoryId ?? "x") % fallbackPalette.length];
}
