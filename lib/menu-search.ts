import type { MenuItem } from "@/types";

/**
 * Search synonym groups so "wrap" also finds dürüm items, "doner" finds
 * "döner", etc. Each group is treated as interchangeable: if the query
 * matches any term in a group, items containing any other term in that
 * same group are considered a match too.
 */
const SYNONYM_GROUPS: string[][] = [
  ["doner", "döner", "donair"],
  ["shoarma", "shawarma", "shawerma"],
  ["wrap", "durum", "dürüm"],
  ["kip", "chicken", "kipfilet"],
  ["patat", "friet", "fries"],
  ["cola", "coca-cola", "coca cola"],
  ["ijs", "ijsje", "ice cream"],
  ["koffie", "coffee"],
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function expandQuery(query: string): string[] {
  const normalized = normalize(query);
  const terms = new Set<string>([normalized]);
  for (const group of SYNONYM_GROUPS) {
    const normalizedGroup = group.map(normalize);
    if (normalizedGroup.some((term) => term.includes(normalized) || normalized.includes(term))) {
      normalizedGroup.forEach((term) => terms.add(term));
    }
  }
  return [...terms];
}

export function matchesSearch(item: MenuItem, query: string): boolean {
  const q = query.trim();
  if (q.length === 0) return true;
  const haystack = normalize(`${item.name} ${item.description}`);
  return expandQuery(q).some((term) => haystack.includes(term));
}
