import type { MenuItem, MenuCategory } from "@/types";
import { siteMode } from "@/data/business";
import { menuCategories, menuItems as demoMenuItems } from "@/data/menu.demo";

/**
 * Mode-aware menu selector. In production mode, demo-flagged items are
 * rejected so a real menu.ts data source must be supplied before that
 * build can ship real demo content. See validateProductionContent().
 */
export const categories: MenuCategory[] = menuCategories;

export const items: MenuItem[] =
  siteMode === "production"
    ? demoMenuItems.filter((i) => !i.demo)
    : demoMenuItems;

export function getItemsByCategory(categoryId: string): MenuItem[] {
  return items.filter((i) => i.categoryId === categoryId);
}

export function getItemBySlug(slug: string): MenuItem | undefined {
  return items.find((i) => i.slug === slug);
}

export function getCategoryById(categoryId: string): MenuCategory | undefined {
  return categories.find((c) => c.id === categoryId);
}

export function getPopularItems(limit = 6): MenuItem[] {
  return items.filter((i) => i.popular).slice(0, limit);
}
