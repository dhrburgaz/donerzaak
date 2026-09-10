import type { MenuItem } from "@/types";
import { FoodIcon, pickIconKind, type IconKind } from "@/components/ui/FoodIcons";

/**
 * Illustrated dish card — the site's stand-in for photography.
 *
 * Real food photography is not available in this environment and this
 * build has no image-generation tool, so hot-linking to guessed stock
 * URLs was ruled out (broken links, wrong dish, unclear licensing).
 * Instead every food slot gets a purpose-drawn icon (see FoodIcons.tsx)
 * on a rich, category-matched color card — designed to read as an
 * intentional illustration system, not a placeholder. See
 * IMAGE_REQUIREMENTS.md for swapping in real photos later.
 */

const categoryPalette: Record<string, [string, string]> = {
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

const fallbackPalette: [string, string][] = [
  ["#2E7D5B", "#173F32"],
  ["#E96B2C", "#C94B32"],
  ["#F4B740", "#E96B2C"],
  ["#173F32", "#2E7D5B"],
];

const steamyIcons = new Set<IconKind>([
  "tray",
  "skewerPlate",
  "flatbread",
  "burger",
  "sandwich",
  "coffeeCup",
  "teaGlass",
  "wings",
  "riceBowl",
]);

function hashString(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return hash;
}

type FoodImageProps = {
  label: string;
  seed?: string;
  item?: Pick<MenuItem, "name" | "categoryId">;
  icon?: IconKind;
  className?: string;
  textClassName?: string;
  /** Skip the centered icon — for full-bleed backgrounds where a single
   * icon would be blown up far past its intended size. */
  hideIcon?: boolean;
};

export function FoodImage({
  label,
  seed,
  item,
  icon,
  className = "",
  textClassName = "text-sm",
  hideIcon = false,
}: FoodImageProps) {
  const resolvedIcon: IconKind = icon ?? (item ? pickIconKind(item) : pickIconKind({ name: label, categoryId: "" }));
  const paletteKey = item?.categoryId;
  const [from, to] =
    (paletteKey && categoryPalette[paletteKey]) ||
    fallbackPalette[hashString(seed ?? label) % fallbackPalette.length];
  const showSteam = steamyIcons.has(resolvedIcon);

  return (
    <div
      className={`group/food relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)` }}
      role="img"
      aria-label={label}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id={`ft-dots-${resolvedIcon}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="1.6" cy="1.6" r="1.3" fill="white" />
        </pattern>
        <rect width="100" height="100" fill={`url(#ft-dots-${resolvedIcon})`} />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-white/5" aria-hidden="true" />

      {showSteam && !hideIcon && (
        <div className="absolute left-1/2 top-[18%] flex -translate-x-1/2 gap-2 opacity-40" aria-hidden="true">
          <span className="steam-wisp h-8 w-1 rounded-full bg-warm-white blur-[2px] [animation-delay:0ms]" />
          <span className="steam-wisp h-10 w-1 rounded-full bg-warm-white blur-[2px] [animation-delay:400ms]" />
          <span className="steam-wisp h-8 w-1 rounded-full bg-warm-white blur-[2px] [animation-delay:800ms]" />
        </div>
      )}

      {!hideIcon && (
        <FoodIcon
          kind={resolvedIcon}
          className="relative h-[42%] w-[42%] max-h-40 max-w-40 drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-out group-hover/food:scale-[1.08] group-hover/food:-rotate-2"
        />
      )}

      <span
        className={`absolute bottom-2 left-2 right-2 truncate rounded-md bg-charcoal/35 px-2 py-1 text-center font-display font-medium text-warm-white/95 backdrop-blur-[1px] ${textClassName}`}
      >
        {label}
      </span>
    </div>
  );
}
