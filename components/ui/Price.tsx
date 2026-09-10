import { formatPrice } from "@/lib/format";

export function Price({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span className={`font-display font-semibold tabular-nums ${className}`}>
      {formatPrice(amount)}
    </span>
  );
}
