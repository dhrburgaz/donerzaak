import { useId } from "react";

/**
 * A single, tasteful premium motion moment: a stylized vertical rotisserie.
 * Pure SVG + CSS (no runtime cost, no library) — a slow-turning hook/skewer
 * and a soft highlight sweeping across the meat, plus a couple of steam
 * wisps reusing the existing .steam-wisp animation. All motion is muted by
 * the site-wide prefers-reduced-motion rule in globals.css, so this needs
 * no extra reduced-motion handling of its own.
 */
export function DonerSpit({ className = "" }: { className?: string }) {
  const gradientId = `doner-cone-${useId()}`;
  const clipId = `doner-cone-clip-${useId()}`;

  return (
    <svg
      viewBox="0 0 90 130"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand-orange)" />
          <stop offset="100%" stopColor="#a4501c" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d="M45 18c14 0 24 6 24 13 0 28-10 62-24 84-14-22-24-56-24-84 0-7 10-13 24-13Z" />
        </clipPath>
      </defs>

      {/* base plate */}
      <ellipse cx="45" cy="122" rx="26" ry="5" fill="var(--brand-charcoal)" opacity="0.12" />

      {/* meat cone */}
      <path
        d="M45 18c14 0 24 6 24 13 0 28-10 62-24 84-14-22-24-56-24-84 0-7 10-13 24-13Z"
        fill={`url(#${gradientId})`}
      />
      <g clipPath={`url(#${clipId})`}>
        <path d="M20 20l20 100M32 15l20 100M44 12l20 100" stroke="#8a4416" strokeWidth="2" opacity="0.35" />
        <rect x="0" y="0" width="26" height="130" fill="var(--brand-amber)" className="doner-sheen" />
      </g>

      {/* skewer stays visually still along its own axis — only the top
          hook's tick mark turns, the honest 2D cue for axial rotation */}
      <line x1="45" y1="6" x2="45" y2="102" stroke="var(--brand-charcoal)" strokeWidth="2.5" strokeLinecap="round" />
      <g className="doner-hook-spin" style={{ transformBox: "fill-box", transformOrigin: "45px 6px" }}>
        <circle cx="45" cy="6" r="4" fill="none" stroke="var(--brand-charcoal)" strokeWidth="2.5" />
        <line x1="45" y1="2" x2="45" y2="4.5" stroke="var(--brand-charcoal)" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* steam */}
      <path d="M36 14c-2-3 1-5-1-8" stroke="var(--brand-warm-white)" strokeWidth="2" strokeLinecap="round" fill="none" className="steam-wisp" opacity="0.7" />
      <path
        d="M54 14c-2-3 1-5-1-8"
        stroke="var(--brand-warm-white)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="steam-wisp"
        opacity="0.7"
        style={{ animationDelay: "0.9s" }}
      />
    </svg>
  );
}
