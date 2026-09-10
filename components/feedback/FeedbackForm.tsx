"use client";

import { useState } from "react";
import { TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success";

/**
 * Own-site feedback only — this never pretends to be a public review wall
 * or a real Google review. Nothing is sent anywhere in demo mode; see
 * OWNER_EDIT_GUIDE.md for wiring it to a real inbox/sheet later.
 */
export function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (website.trim().length > 0) {
      setStatus("success");
      return;
    }

    if (rating === 0) {
      setError("Kies een beoordeling van 1 tot 5 sterren.");
      return;
    }
    setError("");

    setStatus("submitting");
    track("feedback_submitted", { rating });
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-herb/30 bg-herb/5 px-5 py-6 text-center">
        <p className="font-semibold text-forest">Bedankt voor je feedback!</p>
        <p className="mt-1 text-sm text-charcoal/70">
          Demo: deze feedback wordt nu alleen lokaal verwerkt, niet verzonden of openbaar gepubliceerd.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
      >
        <label htmlFor="feedback-website">Website</label>
        <input
          id="feedback-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-charcoal">Hoe was je bestelervaring?</legend>
        <div className="flex gap-1" role="radiogroup" aria-label="Beoordeling in sterren">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} ${value === 1 ? "ster" : "sterren"}`}
              onClick={() => setRating(value)}
              className="p-0.5"
            >
              <svg
                viewBox="0 0 24 24"
                className={`h-8 w-8 ${value <= rating ? "text-orange" : "text-border"}`}
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
        {error && (
          <p className="text-xs font-medium text-red" role="alert">
            {error}
          </p>
        )}
      </fieldset>

      <TextareaField
        label="Opmerking (optioneel)"
        name="feedback-comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Wat vond je van je bestelling?"
      />

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Bezig met versturen…" : "Feedback versturen"}
      </Button>
    </form>
  );
}
