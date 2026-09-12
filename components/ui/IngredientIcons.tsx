/**
 * Small full-color decorative ingredient illustrations — pepper, tomato,
 * garlic, onion, lettuce, sauce. Unlike FoodIcons.tsx (warm-white on a
 * saturated FoodImage background), these sit directly on the page's
 * cream/warm-white background, so they're flat, colored, and self-
 * contained. Used sparingly via IngredientScatter — decoration, not the
 * main content — never inside product cards or anything read as data.
 */

export type IngredientKind = "pepper" | "tomato" | "garlic" | "onion" | "lettuce" | "sauce";

function Base({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const ingredients: Record<IngredientKind, (props: { className?: string }) => React.ReactElement> = {
  pepper: ({ className }) => (
    <Base className={className}>
      <path
        d="M20 10c-1-3-4-4-6-3s-2 4-1 6c-4 2-6 7-5 12 1.5 7 8 11 13 9.5 6-1.7 9-9 7-16-1.3-4.6-4.7-7.5-8-8.5Z"
        fill="#C94B32"
      />
      <path
        d="M20 10c-1-3-4-4-6-3s-2 4-1 6"
        fill="none"
        stroke="#2E7D5B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M16 18c2 2 2 6 0 9" stroke="#e8a591" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
    </Base>
  ),
  tomato: ({ className }) => (
    <Base className={className}>
      <circle cx="24" cy="27" r="13" fill="#C94B32" />
      <path
        d="M24 14c-2-3-6-3-8-1M24 14c2-3 6-3 8-1M24 14v4"
        stroke="#2E7D5B"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M18 22c1.5-1.5 4-2 6-1" stroke="#e8a591" strokeWidth="1.8" strokeLinecap="round" opacity="0.6" fill="none" />
    </Base>
  ),
  garlic: ({ className }) => (
    <Base className={className}>
      <path
        d="M24 9c6 2 9 8 8 15-1 8-4 13-8 14-4-1-7-6-8-14-1-7 2-13 8-15Z"
        fill="#FFFCF7"
        stroke="#e9e0d4"
        strokeWidth="1.5"
      />
      <path d="M24 9v29M18 15c1 6 1 14 0 18M30 15c-1 6-1 14 0 18" stroke="#e9e0d4" strokeWidth="1.5" fill="none" />
      <path d="M22 6c1-2 3-2 4 0" stroke="#2E7D5B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </Base>
  ),
  onion: ({ className }) => (
    <Base className={className}>
      <path d="M24 10c7 3 10 10 8 18-1.5 6-5 9-8 9s-6.5-3-8-9c-2-8 1-15 8-18Z" fill="#8a5a8f" />
      <path
        d="M17 18c3 5 3 12 0 18M31 18c-3 5-3 12 0 18M24 14v22"
        stroke="#fff"
        strokeWidth="1.6"
        opacity="0.45"
        fill="none"
      />
      <path d="M24 10c1-2.5 0-5-1-6" stroke="#2E7D5B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </Base>
  ),
  lettuce: ({ className }) => (
    <Base className={className}>
      <path
        d="M8 28c2-10 10-17 20-16 8 1 14 8 12 15-2 8-11 12-19 10-7-1.7-12-5-13-9Z"
        fill="#2E7D5B"
      />
      <path
        d="M13 26c3-6 9-10 15-9M16 31c3-5 8-8 13-7"
        stroke="#7cc9a0"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
    </Base>
  ),
  sauce: ({ className }) => (
    <Base className={className}>
      <ellipse cx="24" cy="34" rx="14" ry="4" fill="#173F32" opacity="0.08" />
      <path
        d="M24 8c5 7 9 14 9 19a9 9 0 0 1-18 0c0-5 4-12 9-19Z"
        fill="#F4B740"
      />
      <path d="M24 16c1.5 3 3 6 3 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity="0.5" fill="none" />
    </Base>
  ),
};

export function IngredientIcon({
  kind,
  className,
}: {
  kind: IngredientKind;
  className?: string;
}) {
  const Render = ingredients[kind];
  return Render({ className });
}
