import type { MenuItem } from "@/types";

/**
 * Hand-drawn flat/duotone food icon set. Every icon is drawn warm-white
 * (pops on the saturated FoodImage backgrounds) with a single amber accent
 * detail, in a consistent 0 0 64 64 viewBox. This is the "symbols for
 * everything on the menu" layer — see FoodImage for how it's composed with
 * color and pattern, and IMAGE_REQUIREMENTS.md for swapping in real photos
 * later without touching this mapping.
 */

export type IconKind =
  | "wrap"
  | "tray"
  | "sandwich"
  | "flatbread"
  | "skewerPlate"
  | "pizzaSlice"
  | "burger"
  | "wings"
  | "falafel"
  | "fries"
  | "riceBowl"
  | "saladBowl"
  | "hummus"
  | "sauceCup"
  | "sodaCan"
  | "waterBottle"
  | "ayranGlass"
  | "energyCan"
  | "baklava"
  | "cakeSlice"
  | "iceCream"
  | "coffeeCup"
  | "teaGlass"
  | "kidsMeal"
  | "storefront";

const FILL = "#FFFCF7";
const ACCENT = "#F4B740";

function Icon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke={FILL}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const icons: Record<IconKind, (props: { className?: string }) => React.ReactElement> = {
  wrap: ({ className }) => (
    <Icon className={className}>
      <path d="M14 20c0-6 8-10 18-10s18 4 18 10-14 30-18 30-18-24-18-30Z" fill={FILL} fillOpacity={0.15} />
      <path d="M14 20c0-6 8-10 18-10s18 4 18 10" />
      <path d="M17 24c4 2 26 2 30 0M15 30c6 2 28 2 34 0M18 38c4 1.5 20 1.5 24 0" />
      <circle cx="32" cy="20" r="3" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  tray: ({ className }) => (
    <Icon className={className}>
      <rect x="10" y="20" width="44" height="28" rx="4" fill={FILL} fillOpacity={0.12} />
      <path d="M10 24h44" />
      <path d="M17 20v-2c0-3 3-5 6-5h18c3 0 6 2 6 5v2" />
      <path d="M18 30v12M26 30v12M34 30v12M42 30v12" strokeWidth="2" opacity={0.7} />
      <circle cx="46" cy="26" r="2.5" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  sandwich: ({ className }) => (
    <Icon className={className}>
      <path d="M10 30c0-8 10-14 22-14s22 6 22 14" fill={FILL} fillOpacity={0.15} />
      <path d="M8 30h48l-4 8H12l-4-8Z" />
      <path d="M12 38l3 8h34l3-8" />
      <path d="M16 27c2-2 4 2 6 0s4-2 6 0 4 2 6 0 4-2 6 0 4 2 6 0" strokeWidth="2" />
      <circle cx="46" cy="20" r="2.5" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  flatbread: ({ className }) => (
    <Icon className={className}>
      <ellipse cx="32" cy="32" rx="24" ry="14" fill={FILL} fillOpacity={0.15} />
      <ellipse cx="32" cy="32" rx="24" ry="14" />
      <path d="M14 26l10 12M24 22l10 16M36 21l10 17M46 24l6 9" strokeWidth="1.75" opacity={0.6} />
      <circle cx="26" cy="30" r="2" fill={ACCENT} stroke="none" />
      <circle cx="38" cy="34" r="2" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  skewerPlate: ({ className }) => (
    <Icon className={className}>
      <circle cx="32" cy="36" r="20" fill={FILL} fillOpacity={0.12} />
      <circle cx="32" cy="36" r="20" />
      <path d="M16 22l32-10" strokeWidth="3" />
      <rect x="19" y="16" width="5" height="7" rx="1.5" transform="rotate(-17 21.5 19.5)" fill={ACCENT} stroke="none" />
      <rect x="28" y="13" width="5" height="7" rx="1.5" transform="rotate(-17 30.5 16.5)" fill={ACCENT} stroke="none" />
      <rect x="37" y="10" width="5" height="7" rx="1.5" transform="rotate(-17 39.5 13.5)" fill={ACCENT} stroke="none" />
      <path d="M24 40c3-4 13-4 16 0M22 46c5-3 15-3 20 0" strokeWidth="2" opacity={0.7} />
    </Icon>
  ),
  pizzaSlice: ({ className }) => (
    <Icon className={className}>
      <path d="M32 10 54 50a26 26 0 0 1-44 0Z" fill={FILL} fillOpacity={0.15} />
      <path d="M32 10 54 50a26 26 0 0 1-44 0Z" />
      <path d="M22 34a12 12 0 0 1 20 0" strokeWidth="2" opacity={0.6} />
      <circle cx="32" cy="30" r="2.4" fill={ACCENT} stroke="none" />
      <circle cx="26" cy="40" r="2.4" fill={ACCENT} stroke="none" />
      <circle cx="38" cy="40" r="2.4" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  burger: ({ className }) => (
    <Icon className={className}>
      <path d="M12 26c0-8 9-14 20-14s20 6 20 14Z" fill={FILL} fillOpacity={0.15} />
      <path d="M12 26c0-8 9-14 20-14s20 6 20 14Z" />
      <path d="M10 26h44M11 32c2 2 6 2 8 0s6-2 8 0 6 2 8 0 6-2 8 0 6 2 9 0M12 38h40" strokeWidth="2.25" />
      <path d="M9 44a4 4 0 0 1 4-4h38a4 4 0 0 1 4 4 5 5 0 0 1-5 5H14a5 5 0 0 1-5-5Z" fill={FILL} fillOpacity={0.15} />
      <path d="M9 44a4 4 0 0 1 4-4h38a4 4 0 0 1 4 4 5 5 0 0 1-5 5H14a5 5 0 0 1-5-5Z" />
      <circle cx="24" cy="20" r="1.8" fill={ACCENT} stroke="none" />
      <circle cx="32" cy="17" r="1.8" fill={ACCENT} stroke="none" />
      <circle cx="40" cy="20" r="1.8" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  wings: ({ className }) => (
    <Icon className={className}>
      <path d="M22 12c6 0 9 6 8 14-1 9-6 20-10 28-3-2-5-6-4-11 1-8 1-20 6-31Z" fill={FILL} fillOpacity={0.15} />
      <path d="M22 12c6 0 9 6 8 14-1 9-6 20-10 28-3-2-5-6-4-11 1-8 1-20 6-31Z" />
      <path d="M42 12c-6 0-9 6-8 14 1 9 6 20 10 28 3-2 5-6 4-11-1-8-1-20-6-31Z" fill={FILL} fillOpacity={0.15} />
      <path d="M42 12c-6 0-9 6-8 14 1 9 6 20 10 28 3-2 5-6 4-11-1-8-1-20-6-31Z" />
      <circle cx="20" cy="24" r="2" fill={ACCENT} stroke="none" />
      <circle cx="44" cy="24" r="2" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  falafel: ({ className }) => (
    <Icon className={className}>
      <circle cx="22" cy="28" r="10" fill={FILL} fillOpacity={0.15} />
      <circle cx="22" cy="28" r="10" />
      <circle cx="42" cy="26" r="9" fill={FILL} fillOpacity={0.15} />
      <circle cx="42" cy="26" r="9" />
      <circle cx="33" cy="42" r="9.5" fill={FILL} fillOpacity={0.15} />
      <circle cx="33" cy="42" r="9.5" />
      <circle cx="20" cy="26" r="1.4" fill={ACCENT} stroke="none" />
      <circle cx="25" cy="30" r="1.4" fill={ACCENT} stroke="none" />
      <circle cx="41" cy="24" r="1.4" fill={ACCENT} stroke="none" />
      <circle cx="32" cy="41" r="1.4" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  fries: ({ className }) => (
    <Icon className={className}>
      <path d="M18 28h28l-4 24H22l-4-24Z" fill={FILL} fillOpacity={0.15} />
      <path d="M18 28h28l-4 24H22l-4-24Z" />
      <path d="M18 28l3-3h22l3 3" />
      <path d="M24 26V14M30 26V10M34 26V10M40 26V14" strokeWidth="3.25" />
      <circle cx="46" cy="16" r="2.3" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  riceBowl: ({ className }) => (
    <Icon className={className}>
      <path d="M12 32a20 8 0 0 0 40 0Z" fill={FILL} fillOpacity={0.15} />
      <path d="M10 32a22 9 0 0 0 44 0" />
      <path d="M12 32c0-8 9-14 20-14s20 6 20 14" />
      <path d="M14 46l2 4a4 4 0 0 0 4 2h24a4 4 0 0 0 4-2l2-4" />
      <path d="M24 8c0 3-3 3-3 6M34 6c0 3-3 3-3 6M42 10c0 3-3 3-3 6" strokeWidth="2" opacity={0.7} />
    </Icon>
  ),
  saladBowl: ({ className }) => (
    <Icon className={className}>
      <path d="M10 30a22 16 0 0 0 44 0Z" fill={FILL} fillOpacity={0.15} />
      <path d="M10 30a22 16 0 0 0 44 0" />
      <path d="M12 30c1-3 5-3 7-1s5 2 7 0 5-2 7 0 5 2 7 0 6-2 7 1" strokeWidth="2.25" />
      <path d="M15 46l2 3a5 5 0 0 0 4 2h22a5 5 0 0 0 4-2l2-3" />
      <circle cx="24" cy="20" r="2.3" fill={ACCENT} stroke="none" />
      <circle cx="38" cy="18" r="2.3" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  hummus: ({ className }) => (
    <Icon className={className}>
      <circle cx="26" cy="34" r="16" fill={FILL} fillOpacity={0.15} />
      <circle cx="26" cy="34" r="16" />
      <path d="M17 32a9 5 0 0 1 18 0" strokeWidth="2" opacity={0.7} />
      <circle cx="26" cy="30" r="2.3" fill={ACCENT} stroke="none" />
      <path d="M44 20l6 30-10-4Z" fill={FILL} fillOpacity={0.15} />
      <path d="M44 20l6 30-10-4Z" />
    </Icon>
  ),
  sauceCup: ({ className }) => (
    <Icon className={className}>
      <path d="M18 26h28l-3 22a4 4 0 0 1-4 3.5H25a4 4 0 0 1-4-3.5Z" fill={FILL} fillOpacity={0.15} />
      <path d="M18 26h28l-3 22a4 4 0 0 1-4 3.5H25a4 4 0 0 1-4-3.5Z" />
      <path d="M32 26c-6 0-9-4-9-8s4-6 9-6 9 2 9 6-3 8-9 8Z" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  sodaCan: ({ className }) => (
    <Icon className={className}>
      <rect x="22" y="10" width="20" height="42" rx="6" fill={FILL} fillOpacity={0.15} />
      <rect x="22" y="10" width="20" height="42" rx="6" />
      <path d="M22 22h20M22 40h20" strokeWidth="2" opacity={0.6} />
      <path d="M28 10c0-2 1-3 3-3M36 10c0-2 -1-3-3-3" strokeWidth="2" />
      <circle cx="32" cy="8" r="1.6" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  waterBottle: ({ className }) => (
    <Icon className={className}>
      <path d="M27 8h10v8l4 6v32a3 3 0 0 1-3 3H26a3 3 0 0 1-3-3V22l4-6Z" fill={FILL} fillOpacity={0.15} />
      <path d="M27 8h10v8l4 6v32a3 3 0 0 1-3 3H26a3 3 0 0 1-3-3V22l4-6Z" />
      <path d="M23 30h18" strokeWidth="2" opacity={0.6} />
      <circle cx="30" cy="40" r="1.6" fill={ACCENT} stroke="none" />
      <circle cx="35" cy="46" r="1.6" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  ayranGlass: ({ className }) => (
    <Icon className={className}>
      <path d="M20 14h24l-3 36a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4Z" fill={FILL} fillOpacity={0.15} />
      <path d="M20 14h24l-3 36a4 4 0 0 1-4 4H27a4 4 0 0 1-4-4Z" />
      <path d="M18 14h28" />
      <path d="M22 24c3 2 6-2 9 0s6-2 9 0 6-2 6 0" strokeWidth="2" opacity={0.7} />
    </Icon>
  ),
  energyCan: ({ className }) => (
    <Icon className={className}>
      <rect x="22" y="10" width="20" height="42" rx="6" fill={FILL} fillOpacity={0.15} />
      <rect x="22" y="10" width="20" height="42" rx="6" />
      <path d="M35 18l-7 12h6l-5 12 12-14h-7Z" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  baklava: ({ className }) => (
    <Icon className={className}>
      <path d="M32 10 52 32 32 54 12 32Z" fill={FILL} fillOpacity={0.15} />
      <path d="M32 10 52 32 32 54 12 32Z" />
      <path d="M20 32h24M32 18v28" strokeWidth="1.75" opacity={0.6} />
      <circle cx="32" cy="32" r="3" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  cakeSlice: ({ className }) => (
    <Icon className={className}>
      <path d="M12 48 32 14l20 34Z" fill={FILL} fillOpacity={0.15} />
      <path d="M12 48 32 14l20 34Z" />
      <path d="M18 48c2-6 4-10 4-16M46 48c-2-6-4-10-4-16" strokeWidth="2" opacity={0.6} />
      <path d="M28 30c1-3 5-3 6 0s-2 5 0 8" stroke={ACCENT} strokeWidth="2.5" />
    </Icon>
  ),
  iceCream: ({ className }) => (
    <Icon className={className}>
      <circle cx="32" cy="20" r="10" fill={FILL} fillOpacity={0.15} />
      <circle cx="32" cy="20" r="10" />
      <circle cx="24" cy="27" r="8" fill={FILL} fillOpacity={0.15} />
      <circle cx="24" cy="27" r="8" />
      <path d="M22 30 32 54 42 30" fill={FILL} fillOpacity={0.15} />
      <path d="M22 30 32 54 42 30" />
      <circle cx="32" cy="18" r="2" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  coffeeCup: ({ className }) => (
    <Icon className={className}>
      <path d="M16 24h26l-2 20a6 6 0 0 1-6 5H24a6 6 0 0 1-6-5Z" fill={FILL} fillOpacity={0.15} />
      <path d="M16 24h26l-2 20a6 6 0 0 1-6 5H24a6 6 0 0 1-6-5Z" />
      <path d="M42 27c6-1 9 2 9 6s-4 7-9 6" />
      <path d="M22 16c0-2 3-2 3-4M30 16c0-2 3-2 3-4" strokeWidth="2" opacity={0.7} />
      <circle cx="26" cy="30" r="1.8" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  teaGlass: ({ className }) => (
    <Icon className={className}>
      <path d="M24 10h16l4 18a12 22 0 0 1-24 0Z" fill={FILL} fillOpacity={0.15} />
      <path d="M24 10h16l4 18a12 22 0 0 1-24 0Z" />
      <path d="M23 22h18" strokeWidth="2" opacity={0.6} />
      <circle cx="32" cy="34" r="2" fill={ACCENT} stroke="none" />
    </Icon>
  ),
  kidsMeal: ({ className }) => (
    <Icon className={className}>
      <circle cx="32" cy="32" r="20" fill={FILL} fillOpacity={0.12} />
      <circle cx="32" cy="32" r="20" />
      <circle cx="25" cy="27" r="2.3" fill={ACCENT} stroke="none" />
      <circle cx="39" cy="27" r="2.3" fill={ACCENT} stroke="none" />
      <path d="M23 36c3 4 15 4 18 0" strokeWidth="2.75" />
      <path d="M32 6v4M20 9l2 3.5M44 9l-2 3.5" strokeWidth="2.25" />
    </Icon>
  ),
  storefront: ({ className }) => (
    <Icon className={className}>
      <path d="M10 22 14 10h36l4 12" fill={FILL} fillOpacity={0.12} />
      <path d="M10 22 14 10h36l4 12" />
      <path d="M10 22v4a5 5 0 0 0 10 0v-4M20 22v4a5 5 0 0 0 10 0v-4M30 22v4a5 5 0 0 0 10 0v-4M40 22v4a5 5 0 0 0 10 0v-4" />
      <path d="M14 28v20a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3V28" />
      <path d="M26 51V38a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v13" fill={FILL} fillOpacity={0.15} />
      <circle cx="35" cy="43" r="1.6" fill={ACCENT} stroke="none" />
    </Icon>
  ),
};

const categoryDefaults: Record<string, IconKind> = {
  kapsalon: "tray",
  durum: "wrap",
  broodjes: "sandwich",
  "turkse-pizza": "flatbread",
  grill: "skewerPlate",
  pizza: "pizzaSlice",
  burgers: "burger",
  vegetarisch: "wrap",
  kindermenu: "kidsMeal",
  bijgerechten: "fries",
  sauzen: "sauceCup",
  dranken: "sodaCan",
  "dessert-koffie": "coffeeCup",
};

const keywordRules: [RegExp, IconKind][] = [
  [/hotwing|nugget|tender/i, "wings"],
  [/falafel/i, "falafel"],
  [/kapsalon/i, "tray"],
  [/d[uü]r[uü]m|wrap/i, "wrap"],
  [/broodje/i, "sandwich"],
  [/schotel|mix grill|spareribs/i, "skewerPlate"],
  [/friet/i, "fries"],
  [/rijst/i, "riceBowl"],
  [/salade/i, "saladBowl"],
  [/hummus/i, "hummus"],
  [/knoflook|sambal|cocktail|mayonaise|andalouse/i, "sauceCup"],
  [/coca-cola|fanta|sprite/i, "sodaCan"],
  [/spa (blauw|rood)/i, "waterBottle"],
  [/ayran/i, "ayranGlass"],
  [/red bull/i, "energyCan"],
  [/baklava/i, "baklava"],
  [/lava cake/i, "cakeSlice"],
  [/ijs/i, "iceCream"],
  [/espresso|cappuccino|^koffie$|koffie\b/i, "coffeeCup"],
  [/thee/i, "teaGlass"],
  [/pizza/i, "pizzaSlice"],
];

export function pickIconKind(item: Pick<MenuItem, "name" | "categoryId">): IconKind {
  for (const [pattern, kind] of keywordRules) {
    if (pattern.test(item.name)) return kind;
  }
  return categoryDefaults[item.categoryId] ?? "tray";
}

export function FoodIcon({ kind, className }: { kind: IconKind; className?: string }) {
  const Cmp = icons[kind];
  return <Cmp className={className} />;
}
