"use client";

import { useState } from "react";
import { Field, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { ErrorState } from "@/components/ui/ErrorState";

type FormState = { name: string; email: string; message: string; website: string };
type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Vul je naam in.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Vul een geldig e-mailadres in.";
    if (form.message.trim().length < 5) next.message = "Vertel ons waar we mee kunnen helpen.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.website.trim().length > 0) {
      setStatus("success");
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-herb/30 bg-herb/5 px-6 py-8 text-center">
        <p className="font-display text-lg font-bold text-forest">Bericht verzonden</p>
        <p className="mt-2 text-sm text-charcoal/70">
          Bedankt voor je bericht, we reageren zo snel mogelijk.
        </p>
        <p className="mt-3 text-xs text-muted">
          Demo: er is nog geen e-mail-koppeling geconfigureerd — zie OWNER_EDIT_GUIDE.md.
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
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>
      <Field label="Naam" name="name" value={form.name} onChange={(e) => update("name", e.target.value)} error={errors.name} />
      <Field
        label="E-mail"
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
        error={errors.email}
      />
      <TextareaField
        label="Bericht"
        name="message"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
        error={errors.message}
      />
      {status === "error" && <ErrorState description="Er ging iets mis. Probeer het later opnieuw." />}
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Bezig met versturen…" : "Verstuur bericht"}
      </Button>
    </form>
  );
}
