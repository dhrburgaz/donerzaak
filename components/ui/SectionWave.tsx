/**
 * Decorative wavy divider between sections — softens the hard rectangular
 * seams between color blocks. `className` should set a `text-*` color
 * matching the section that follows (the wave is filled with currentColor).
 */
export function SectionWave({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-10 w-full translate-y-px sm:h-14 ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <path
        d="M0 24c120 20 240 30 360 30s240-16 480-16 360 20 480 12 120-20 120-20V60H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
