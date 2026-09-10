/**
 * Demo photography placeholder.
 *
 * Real food photography is not available in this environment and
 * hot-linking to guessed/unverified stock-photo URLs is unsafe (broken
 * links, wrong images, unclear licensing). Until real photos are
 * supplied, every image slot renders this editorial gradient placeholder
 * instead of a broken `<img>` or a generic gray box — see
 * IMAGE_REQUIREMENTS.md for exactly what must be replaced before
 * production, and IMAGE_SOURCES.md for sourcing guidance.
 */

const gradients = [
  "from-[#2E7D5B] via-[#173F32] to-[#0f2018]",
  "from-[#E96B2C] via-[#C94B32] to-[#6b2013]",
  "from-[#F4B740] via-[#E96B2C] to-[#173F32]",
  "from-[#173F32] via-[#2E7D5B] to-[#F4B740]",
];

function gradientForSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return gradients[hash % gradients.length];
}

export function FoodImage({
  label,
  seed,
  className = "",
  textClassName = "text-sm",
}: {
  label: string;
  seed?: string;
  className?: string;
  textClassName?: string;
}) {
  const gradient = gradientForSeed(seed ?? label);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
      role="img"
      aria-label={`${label} — demo foto, nog te vervangen door echte productfotografie`}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.15]"
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <pattern id="fresh-tasty-dots" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="white" />
        </pattern>
        <rect width="100" height="100" fill="url(#fresh-tasty-dots)" />
      </svg>
      <svg
        className="relative h-10 w-10 text-warm-white/70"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          d="M7 3v6a2 2 0 0 0 2 2v10M17 3v7M12 3v7M17 3c1.5 0 2.5 1 2.5 2.5S18.5 10 17 10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`absolute bottom-2 left-2 right-2 truncate rounded-md bg-charcoal/30 px-2 py-1 font-display font-medium text-warm-white/90 ${textClassName}`}
      >
        {label}
      </span>
    </div>
  );
}
