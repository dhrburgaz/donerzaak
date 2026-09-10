"use client";

import Link from "next/link";
import {
  isOpenNow,
  getClosingTime,
  getNextOpeningTime,
} from "@/data/opening-hours";
import { useHasMounted } from "@/lib/use-has-mounted";

export function OpeningStatus({ className = "" }: { className?: string }) {
  const mounted = useHasMounted();

  if (!mounted) {
    return <span className={className} aria-hidden="true" />;
  }

  if (isOpenNow()) {
    const closing = getClosingTime();
    return (
      <span className={className}>
        <span className="inline-block h-2 w-2 rounded-full bg-herb" aria-hidden="true" />{" "}
        Nu geopend{closing ? ` · tot ${closing}` : ""}
      </span>
    );
  }

  const next = getNextOpeningTime();
  if (next) {
    return (
      <span className={className}>
        <span className="inline-block h-2 w-2 rounded-full bg-muted" aria-hidden="true" />{" "}
        Gesloten · {next.day} open om {next.time}
      </span>
    );
  }

  return (
    <Link href="/contact" className={`underline underline-offset-2 ${className}`}>
      Bekijk actuele openingstijden
    </Link>
  );
}
