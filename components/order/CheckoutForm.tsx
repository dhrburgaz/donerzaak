"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Field, SelectField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { formatPrice } from "@/lib/format";
import { getOrderProvider } from "@/lib/order-provider";
import type { FulfillmentMethod, OrderPayload } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

const DELIVERY_FEE = 2.5;

type FormState = {
  fulfillment: FulfillmentMethod;
  name: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  postalCode: string;
  city: string;
  addressNotes: string;
  time: string;
  payment: "ideal" | "pin" | "contant";
  notes: string;
};

const initialState: FormState = {
  fulfillment: "afhalen",
  name: "",
  phone: "",
  email: "",
  street: "",
  number: "",
  postalCode: "",
  city: "Dordrecht",
  addressNotes: "",
  time: "asap",
  payment: "ideal",
  notes: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

export function CheckoutForm() {
  const { lines, subtotal, clearCart, hydrated } = useCart();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Vul je naam in.";
    if (!/^[\d+()\-\s]{8,}$/.test(form.phone.trim())) {
      next.phone = "Vul een geldig telefoonnummer in.";
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = "Vul een geldig e-mailadres in.";
    }
    if (form.fulfillment === "bezorgen") {
      if (!form.street.trim()) next.street = "Vul je straat in.";
      if (!form.number.trim()) next.number = "Vul je huisnummer in.";
      if (!/^\d{4}\s?[A-Za-z]{2}$/.test(form.postalCode.trim())) {
        next.postalCode = "Vul een geldige postcode in (1234 AB).";
      }
      if (!form.city.trim()) next.city = "Vul je plaats in.";
    }
    return next;
  }

  const deliveryFee = form.fulfillment === "bezorgen" ? DELIVERY_FEE : 0;
  const total = subtotal + deliveryFee;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload: OrderPayload = {
      lines,
      fulfillment: form.fulfillment,
      contact: { name: form.name, phone: form.phone, email: form.email || undefined },
      address:
        form.fulfillment === "bezorgen"
          ? {
              street: form.street,
              number: form.number,
              postalCode: form.postalCode,
              city: form.city,
              notes: form.addressNotes || undefined,
            }
          : undefined,
      requestedTime: form.time,
      paymentMethod: form.payment,
      notes: form.notes || undefined,
      subtotal,
      deliveryFee,
      total,
    };

    try {
      const result = await getOrderProvider().submitOrder(payload);
      try {
        window.sessionStorage.setItem(
          "freshtasty-last-order",
          JSON.stringify({ payload, result })
        );
      } catch {
        // sessionStorage unavailable — confirmation page falls back to URL params.
      }
      clearCart();
      const params = new URLSearchParams({
        order: result.orderNumber,
        total: total.toFixed(2),
        method: form.fulfillment,
        demo: result.demo ? "1" : "0",
      });
      router.push(`/bestelling/gelukt?${params.toString()}`);
    } catch {
      setSubmitError(
        "Er ging iets mis bij het plaatsen van de demo-bestelling. Probeer het opnieuw."
      );
      setSubmitting(false);
    }
  }

  if (!hydrated) return null;

  if (lines.length === 0) {
    return (
      <EmptyState
        title="Je bestelling is leeg"
        description="Voeg eerst gerechten toe via het menu voordat je kunt afrekenen."
        action={
          <Button href="/menu" size="md">
            Naar het menu
          </Button>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-10">
        <fieldset className="flex flex-col gap-3">
          <legend className="font-display text-lg font-bold text-forest">1. Afhalen of bezorgen</legend>
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

        <fieldset className="flex flex-col gap-4">
          <legend className="font-display text-lg font-bold text-forest">2. Contactgegevens</legend>
          <Field
            label="Naam"
            name="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            label="Telefoonnummer"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            error={errors.phone}
            autoComplete="tel"
          />
          <Field
            label="E-mail (optioneel)"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
        </fieldset>

        {form.fulfillment === "bezorgen" && (
          <fieldset className="flex flex-col gap-4">
            <legend className="font-display text-lg font-bold text-forest">3. Bezorgadres</legend>
            <div className="grid grid-cols-[1fr_120px] gap-3">
              <Field
                label="Straat"
                name="street"
                value={form.street}
                onChange={(e) => update("street", e.target.value)}
                error={errors.street}
              />
              <Field
                label="Huisnummer"
                name="number"
                value={form.number}
                onChange={(e) => update("number", e.target.value)}
                error={errors.number}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Postcode"
                name="postalCode"
                value={form.postalCode}
                onChange={(e) => update("postalCode", e.target.value)}
                error={errors.postalCode}
                placeholder="1234 AB"
              />
              <Field
                label="Plaats"
                name="city"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                error={errors.city}
              />
            </div>
            <TextareaField
              label="Opmerking bij adres (optioneel)"
              name="addressNotes"
              value={form.addressNotes}
              onChange={(e) => update("addressNotes", e.target.value)}
            />
          </fieldset>
        )}

        <fieldset className="flex flex-col gap-4">
          <legend className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "4" : "3"}. Tijd
          </legend>
          <SelectField
            label="Gewenst tijdstip"
            name="time"
            value={form.time}
            onChange={(e) => update("time", e.target.value)}
          >
            <option value="asap">Zo snel mogelijk</option>
            <option value="30min">Over 30 minuten</option>
            <option value="1hour">Over 1 uur</option>
          </SelectField>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "5" : "4"}. Betaalmethode
          </legend>
          <div className="grid grid-cols-3 gap-3">
            {(
              [
                { id: "ideal", label: "iDEAL" },
                { id: "pin", label: "Pin bij afhalen" },
                { id: "contant", label: "Contant" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => update("payment", option.id)}
                aria-pressed={form.payment === option.id}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold ${
                  form.payment === option.id
                    ? "border-forest bg-forest text-warm-white"
                    : "border-border bg-warm-white text-charcoal"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted">
            Demo: er wordt geen echte betaling verwerkt.
          </p>
        </fieldset>

        <TextareaField
          label="Opmerking voor de bestelling (optioneel)"
          name="notes"
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-cream/40 p-5 lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-display text-lg font-bold text-forest">Besteloverzicht</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {lines.map((line) => (
            <li key={line.lineId} className="flex justify-between gap-3">
              <span className="text-charcoal/80">
                {line.quantity}× {line.name}
              </span>
              <span className="shrink-0 tabular-nums text-charcoal">
                {formatPrice(line.unitPrice * line.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-1 border-t border-border pt-3 text-sm">
          <div className="flex justify-between text-charcoal/80">
            <span>Subtotaal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-charcoal/80">
            <span>Bezorgkosten</span>
            <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : "—"}</span>
          </div>
          <div className="flex justify-between pt-1 font-display text-base font-bold text-forest">
            <span>Totaal</span>
            <Price amount={total} />
          </div>
        </div>

        {submitError && <ErrorState description={submitError} />}

        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? "Bezig met plaatsen…" : `Bestelling plaatsen · ${formatPrice(total)}`}
        </Button>
      </aside>
    </form>
  );
}
