"use client";

import { useState } from "react";
import { Field, SelectField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";
import { track } from "@/lib/analytics";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  fulfillment: "afhalen" | "bezorgen";
  notes: string;
  website: string; // honeypot — must stay empty
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "",
  occasion: "bedrijfslunch",
  fulfillment: "afhalen",
  notes: "",
  website: "",
};

type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

export function CateringForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Vul je naam in.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Vul een geldig e-mailadres in.";
    if (!/^[\d+()\-\s]{8,}$/.test(form.phone.trim())) next.phone = "Vul een geldig telefoonnummer in.";
    if (!form.date) next.date = "Kies een datum.";
    if (!form.guests || Number(form.guests) < 1) next.guests = "Vul het aantal personen in.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.website.trim().length > 0) {
      // Honeypot triggered — silently pretend success without submitting anything.
      setStatus("success");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    track("catering_started");

    try {
      // No email/API backend is configured yet — see OWNER_EDIT_GUIDE.md for
      // how to connect one. Nothing is sent or stored externally in demo mode.
      await new Promise((resolve) => setTimeout(resolve, 700));
      track("catering_submitted");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-herb/30 bg-herb/5 px-6 py-10 text-center">
        <p className="font-display text-xl font-bold text-forest">Aanvraag verzonden</p>
        <p className="mt-2 text-charcoal/75">
          Bedankt! We nemen zo snel mogelijk contact met je op om je catering te bespreken.
        </p>
        <p className="mt-4 text-xs text-muted">
          Demo: deze aanvraag is niet daadwerkelijk verzonden — er is nog geen e-mail/API-koppeling
          geconfigureerd. Zie OWNER_EDIT_GUIDE.md.
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
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Naam" name="name" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
        <Field
          label="Bedrijf / organisatie (optioneel)"
          name="company"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
        <Field
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <Field
          label="Telefoon"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />
        <Field
          label="Datum"
          name="date"
          type="date"
          value={form.date}
          onChange={(e) => update("date", e.target.value)}
          error={errors.date}
        />
        <Field
          label="Gewenst tijdstip (optioneel)"
          name="time"
          type="time"
          value={form.time}
          onChange={(e) => update("time", e.target.value)}
        />
        <Field
          label="Aantal personen"
          name="guests"
          type="number"
          min={1}
          value={form.guests}
          onChange={(e) => update("guests", e.target.value)}
          error={errors.guests}
        />
        <SelectField
          label="Type gelegenheid"
          name="occasion"
          value={form.occasion}
          onChange={(e) => update("occasion", e.target.value)}
        >
          <option value="bedrijfslunch">Bedrijfslunch</option>
          <option value="vergadering">Vergadering</option>
          <option value="school">School / opleiding</option>
          <option value="teamdag">Teamdag</option>
          <option value="verjaardag">Verjaardag</option>
          <option value="evenement">Evenement</option>
          <option value="anders">Anders</option>
        </SelectField>
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-charcoal">Afhalen of bezorgen</legend>
        <div className="flex gap-3">
          {(["afhalen", "bezorgen"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update("fulfillment", option)}
              aria-pressed={form.fulfillment === option}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-semibold capitalize ${
                form.fulfillment === option
                  ? "border-forest bg-forest text-warm-white"
                  : "border-border bg-warm-white text-charcoal"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <TextareaField
        label="Opmerkingen (optioneel)"
        name="notes"
        value={form.notes}
        onChange={(e) => update("notes", e.target.value)}
        placeholder="Vertel ons meer over je catering-wens"
      />

      {status === "error" && (
        <ErrorState description="Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons direct." />
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Bezig met versturen…" : "Vraag catering aan"}
      </Button>
    </form>
  );
}
