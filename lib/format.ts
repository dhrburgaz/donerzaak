const currencyFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(amount: number): string {
  return currencyFormatter.format(amount);
}
