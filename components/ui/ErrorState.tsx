export function ErrorState({
  title = "Er ging iets mis",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-2 rounded-2xl border border-red/30 bg-red/5 px-6 py-10 text-center"
    >
      <p className="font-display text-lg font-semibold text-red">{title}</p>
      {description && <p className="max-w-sm text-sm text-charcoal/80">{description}</p>}
    </div>
  );
}
