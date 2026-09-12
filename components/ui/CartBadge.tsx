export function CartBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      key={count}
      aria-hidden="true"
      className="badge-pop absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[0.65rem] font-bold text-charcoal ring-2 ring-warm-white"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
