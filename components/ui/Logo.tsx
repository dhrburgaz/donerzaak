import Link from "next/link";
import { business } from "@/data/business";

/**
 * Placeholder wordmark lockup.
 *
 * The real Fresh & Tasty logo could not be retrieved in this environment
 * (no network access to freshtasty.nl). Per the brief, the EXISTING logo
 * must be kept — do not treat this as the final brand mark. Replace it
 * by dropping the owner's logo file at /public/brand/logo.svg (or .png)
 * and swapping the markup below for an <Image> pointing at it. See
 * OWNER_EDIT_GUIDE.md.
 */
export function Logo({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-2 font-display ${className}`}
      aria-label={`${business.shortName} — naar de homepage`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`h-8 w-8 shrink-0 ${dark ? "text-amber" : "text-herb"}`}
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.12" />
        <path
          d="M16 25c5-1 8-5.5 8-10.5 0-1.8-.3-3.3-.8-4.5-1 2.3-3.3 3.7-6 3.9C13.9 9 13 5.5 13 5.5S9 9.5 9 15c0 5.5 3.5 9 7 10Z"
          fill="currentColor"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-bold tracking-tight ${dark ? "text-warm-white" : "text-forest"}`}
        >
          Fresh<span className="text-orange">&amp;</span>Tasty
        </span>
        <span
          className={`text-[0.6rem] font-medium uppercase tracking-[0.18em] ${
            dark ? "text-warm-white/60" : "text-muted"
          }`}
        >
          Dordrecht
        </span>
      </span>
    </Link>
  );
}
