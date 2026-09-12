"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { Field, SelectField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/Price";
import { formatPrice } from "@/lib/format";
import { getOrderProvider } from "@/lib/order-provider";
import { getPaymentProvider } from "@/lib/payments";
import { PaymentMethodPicker } from "@/components/order/PaymentMethodPicker";
import { paymentMethodsFor } from "@/data/payment-methods";
import { orderingConfig } from "@/data/ordering-config";
import { generatePlannedSlots } from "@/lib/order-time";
import { saveOrder } from "@/lib/order-history";
import type { AppliedCoupon, FulfillmentMethod, OrderPayload, PaymentMethodId, TipOption } from "@/types";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { validateCoupon, markOrderPlaced } from "@/lib/coupons";
import { incrementStamp } from "@/lib/loyalty";
import { track } from "@/lib/analytics";
import { findUnavailableLines } from "@/lib/cart-availability";
import { business } from "@/data/business";
import { telHref } from "@/data/navigation";

type TimeMode = "asap" | "plan";

type FormState = {
  fulfillment: FulfillmentMethod;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  addition: string;
  postalCode: string;
  city: string;
  addressNotes: string;
  timeMode: TimeMode;
  plannedTime: string;
  payment: PaymentMethodId;
  notes: string;
  tipOption: TipOption;
  tipCustom: string;
};

const initialState: FormState = {
  fulfillment: "afhalen",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  street: "",
  number: "",
  addition: "",
  postalCode: "",
  city: "Dordrecht",
  addressNotes: "",
  timeMode: "asap",
  plannedTime: "",
  payment: "ideal",
  notes: "",
  tipOption: "none",
  tipCustom: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  el.focus({ preventScroll: true });
}

function WijzigenButton({ target }: { target: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToSection(target)}
      className="text-xs font-semibold text-orange underline underline-offset-2 hover:text-[#d85f22]"
    >
      Wijzigen
    </button>
  );
}

export function CheckoutForm() {
  const { lines, subtotal, clearCart, removeLine, hydrated } = useCart();
  const unavailable = findUnavailableLines(lines);
  const unavailableIds = new Set(unavailable.map((u) => u.line.lineId));
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const router = useRouter();
  const reviewedRef = useRef(false);

  useEffect(() => {
    if (reviewedRef.current) return;
    reviewedRef.current = true;
    track("order_reviewed");
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function selectFulfillment(option: FulfillmentMethod) {
    update("fulfillment", option);
    // Pay-at-pickup methods don't apply once delivery is chosen.
    if (option === "bezorgen" && (form.payment === "pin" || form.payment === "contant")) {
      update("payment", "ideal");
    }
    track("fulfillment_selected", { fulfillment: option });
  }

  function validate(): Errors {
    const next: Errors = {};
    if (form.firstName.trim().length < 2) next.firstName = "Vul je voornaam in.";
    if (form.lastName.trim().length < 2) next.lastName = "Vul je achternaam in.";
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
    if (form.timeMode === "plan" && !form.plannedTime) {
      next.plannedTime = "Kies een tijdstip.";
    }
    if (form.tipOption === "custom") {
      const parsed = Number(form.tipCustom.replace(",", "."));
      if (!form.tipCustom.trim() || !Number.isFinite(parsed) || parsed < 0) {
        next.tipCustom = "Vul een geldig fooibedrag in.";
      }
    }
    return next;
  }

  const belowFreeDelivery = subtotal < orderingConfig.freeDeliveryFrom;
  const deliveryFee =
    form.fulfillment === "bezorgen" && appliedCoupon?.type !== "free-delivery" && belowFreeDelivery
      ? orderingConfig.deliveryFee
      : 0;
  const discountAmount = appliedCoupon && appliedCoupon.type !== "free-delivery" ? appliedCoupon.discountAmount : 0;

  const tipAmount = (() => {
    if (form.tipOption === "none") return 0;
    if (form.tipOption === "custom") {
      const parsed = Number(form.tipCustom.replace(",", "."));
      return Number.isFinite(parsed) && parsed > 0 ? Math.round(parsed * 100) / 100 : 0;
    }
    const pct = Number(form.tipOption);
    return Math.round(subtotal * (pct / 100) * 100) / 100;
  })();

  const total = Math.max(0, subtotal - discountAmount + deliveryFee + tipAmount);

  const minimumDeliveryUnmet =
    form.fulfillment === "bezorgen" && subtotal < orderingConfig.minimumDeliveryOrder;

  const estimateRange =
    form.fulfillment === "bezorgen" ? orderingConfig.estimatedDeliveryMinutes : orderingConfig.estimatedPickupMinutes;

  const plannedSlots = generatePlannedSlots();

  function handleApplyCoupon() {
    const result = validateCoupon(couponInput, { subtotal, fulfillment: form.fulfillment });
    if ("error" in result) {
      setCouponError(result.error);
      setAppliedCoupon(null);
      return;
    }
    setAppliedCoupon(result.coupon);
    setCouponError(null);
    track("promo_applied", { code: result.coupon.code });
  }

  function handleRemoveCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
  }

  function selectTip(option: TipOption) {
    update("tipOption", option);
    track("tip_selected", { option });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Defense in depth against a double dispatch (e.g. a rapid double
    // click/tap racing ahead of the disabled-button re-render).
    if (submitting) return;

    if (lines.length === 0) return;

    if (unavailable.length > 0) {
      setSubmitError(
        "Eén of meer producten in je bestelling zijn niet meer beschikbaar. Verwijder ze om verder te kunnen afrekenen."
      );
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    const errorKeys = Object.keys(nextErrors);
    if (errorKeys.length > 0) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const firstInvalid = document.getElementById(errorKeys[0]);
      firstInvalid?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      firstInvalid?.focus();
      return;
    }

    if (minimumDeliveryUnmet) {
      setSubmitError(
        `Minimale bestelling voor bezorgen is ${formatPrice(orderingConfig.minimumDeliveryOrder)}. Voeg nog iets toe of kies afhalen.`
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload: OrderPayload = {
      lines,
      fulfillment: form.fulfillment,
      contact: {
        name: `${form.firstName} ${form.lastName}`.trim(),
        phone: form.phone,
        email: form.email || undefined,
      },
      address:
        form.fulfillment === "bezorgen"
          ? {
              street: form.street,
              number: form.number,
              addition: form.addition || undefined,
              postalCode: form.postalCode,
              city: form.city,
              notes: form.addressNotes || undefined,
            }
          : undefined,
      requestedTime: form.timeMode === "asap" ? "asap" : form.plannedTime,
      paymentMethod: form.payment,
      notes: form.notes || undefined,
      subtotal,
      deliveryFee,
      discount: appliedCoupon ?? undefined,
      tip: tipAmount,
      total,
    };

    try {
      const result = await getOrderProvider().submitOrder(payload);
      const payment = await getPaymentProvider().createPayment({
        amount: total,
        method: form.payment,
        orderNumber: result.orderNumber,
        description: `Fresh & Tasty bestelling ${result.orderNumber}`,
      });

      saveOrder(result.orderNumber, { payload, result, payment, createdAt: new Date().toISOString() });

      clearCart();
      markOrderPlaced();
      const stampCount = incrementStamp();
      track("demo_order_submitted", { orderNumber: result.orderNumber, total });
      const params = new URLSearchParams({
        order: result.orderNumber,
        total: total.toFixed(2),
        method: form.fulfillment,
        demo: result.demo ? "1" : "0",
        stamps: String(stampCount),
      });
      router.push(`/bestelling/gelukt?${params.toString()}`);
    } catch {
      track("checkout_error", { stage: "submit" });
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

  const paymentLabel = paymentMethodsFor(form.fulfillment).find((m) => m.id === form.payment)?.label ?? form.payment;
  const errorEntries = Object.entries(errors) as [keyof FormState, string][];

  return (
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="flex flex-col gap-10">
        {errorEntries.length > 1 && (
          <div role="alert" className="rounded-2xl border border-red/30 bg-red/5 p-4">
            <p className="font-semibold text-red">Controleer de volgende velden:</p>
            <ul className="mt-2 flex flex-col gap-1">
              {errorEntries.map(([key, message]) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById(key);
                      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                      el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
                      el?.focus();
                    }}
                    className="text-sm text-red underline underline-offset-2 hover:text-[#a53b26]"
                  >
                    {message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset id="checkout-fulfillment" tabIndex={-1} className="flex min-w-0 flex-col gap-3 outline-none">
          <legend className="font-display text-lg font-bold text-forest">1. Afhalen of bezorgen</legend>
          <div className="flex gap-3">
            {(["afhalen", "bezorgen"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => selectFulfillment(option)}
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
          {form.fulfillment === "bezorgen" && (
            <p className="text-xs text-muted">
              Minimale bestelling {formatPrice(orderingConfig.minimumDeliveryOrder)} · gratis bezorgen vanaf{" "}
              {formatPrice(orderingConfig.freeDeliveryFrom)}.
            </p>
          )}
        </fieldset>

        <fieldset id="checkout-time" tabIndex={-1} className="flex min-w-0 flex-col gap-3 outline-none">
          <legend className="font-display text-lg font-bold text-forest">2. Tijd</legend>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => update("timeMode", "asap")}
              aria-pressed={form.timeMode === "asap"}
              className={`flex-1 rounded-xl border px-4 py-3 text-left text-sm font-semibold ${
                form.timeMode === "asap"
                  ? "border-forest bg-forest text-warm-white"
                  : "border-border bg-warm-white text-charcoal"
              }`}
            >
              Zo snel mogelijk
              <span className={`block text-xs font-normal ${form.timeMode === "asap" ? "text-warm-white/80" : "text-muted"}`}>
                ~{estimateRange[0]}-{estimateRange[1]} min
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                update("timeMode", "plan");
                if (!form.plannedTime && plannedSlots[0]) update("plannedTime", plannedSlots[0].value);
              }}
              aria-pressed={form.timeMode === "plan"}
              disabled={plannedSlots.length === 0}
              className={`flex-1 rounded-xl border px-4 py-3 text-left text-sm font-semibold disabled:opacity-40 ${
                form.timeMode === "plan"
                  ? "border-forest bg-forest text-warm-white"
                  : "border-border bg-warm-white text-charcoal"
              }`}
            >
              Tijd plannen
            </button>
          </div>
          {form.timeMode === "plan" && (
            plannedSlots.length > 0 ? (
              <SelectField
                label="Gewenst tijdstip"
                name="plannedTime"
                value={form.plannedTime}
                onChange={(e) => {
                  update("plannedTime", e.target.value);
                  track("timeslot_selected", { time: e.target.value });
                }}
                error={errors.plannedTime}
              >
                {plannedSlots.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </SelectField>
            ) : (
              <p className="text-xs text-muted">
                Nu geen geplande tijden beschikbaar — kies &ldquo;Zo snel mogelijk&rdquo;.
              </p>
            )
          )}
        </fieldset>

        <fieldset id="checkout-contact" tabIndex={-1} className="flex min-w-0 flex-col gap-4 outline-none">
          <legend className="font-display text-lg font-bold text-forest">3. Klantgegevens</legend>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Voornaam"
              name="firstName"
              value={form.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              error={errors.firstName}
              autoComplete="given-name"
            />
            <Field
              label="Achternaam"
              name="lastName"
              value={form.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              error={errors.lastName}
              autoComplete="family-name"
            />
          </div>
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
          <fieldset id="checkout-address" tabIndex={-1} className="flex min-w-0 flex-col gap-4 outline-none">
            <legend className="font-display text-lg font-bold text-forest">4. Bezorgadres</legend>
            <p className="text-xs text-muted">
              Ons bezorggebied is nog niet exact vastgelegd. Twijfel je of jouw adres binnen bereik
              valt? Bel ons even op{" "}
              <a href={telHref} className="font-medium text-forest underline underline-offset-2">
                {business.phoneDisplay}
              </a>{" "}
              voordat je afrekent.
            </p>
            <div className="grid grid-cols-[minmax(0,1fr)_84px_84px] gap-3">
              <Field
                label="Straat"
                name="street"
                value={form.street}
                onChange={(e) => update("street", e.target.value)}
                error={errors.street}
                autoComplete="address-line1"
              />
              <Field
                label="Huisnummer"
                name="number"
                value={form.number}
                onChange={(e) => update("number", e.target.value)}
                error={errors.number}
              />
              <Field
                label="Toevoeging"
                name="addition"
                value={form.addition}
                onChange={(e) => update("addition", e.target.value)}
                autoComplete="address-line2"
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
                autoComplete="postal-code"
                onBlur={() => {
                  if (!errors.postalCode) track("address_completed");
                }}
              />
              <Field
                label="Plaats"
                name="city"
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                error={errors.city}
                autoComplete="address-level2"
              />
            </div>
            <TextareaField
              label="Bezorginstructies (optioneel)"
              name="addressNotes"
              value={form.addressNotes}
              onChange={(e) => update("addressNotes", e.target.value)}
              placeholder="Bijv. verdieping, deurcode"
            />
          </fieldset>
        )}

        <fieldset id="checkout-notes" tabIndex={-1} className="flex min-w-0 flex-col gap-3 outline-none">
          <legend className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "5" : "4"}. Opmerkingen
          </legend>
          <TextareaField
            label="Opmerking voor de keuken (optioneel)"
            name="notes"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
          />
          <p className="text-xs text-muted">
            Heb je een allergie of voedselintolerantie? Neem bij twijfel contact met ons op.
          </p>
        </fieldset>

        <fieldset id="checkout-payment" tabIndex={-1} className="flex min-w-0 flex-col gap-3 outline-none">
          <legend className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "6" : "5"}. Betaalmethode
          </legend>
          <PaymentMethodPicker
            methods={paymentMethodsFor(form.fulfillment)}
            value={form.payment}
            onChange={(id) => update("payment", id)}
          />
          <p className="text-xs text-muted">Demo: er wordt geen echte betaling verwerkt.</p>
        </fieldset>

        <fieldset id="checkout-coupon" tabIndex={-1} className="flex min-w-0 flex-col gap-2 outline-none">
          <legend className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "7" : "6"}. Kortingscode
          </legend>
          {appliedCoupon ? (
            <div className="flex items-center justify-between gap-2 rounded-lg bg-herb/10 px-3 py-2 text-sm">
              <span className="font-medium text-forest">
                Coupon {appliedCoupon.code} toegepast — {appliedCoupon.description}
              </span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs font-medium text-muted underline underline-offset-2 hover:text-red"
              >
                Verwijderen
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Heb je een kortingscode?"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-warm-white px-3 text-sm uppercase placeholder:normal-case placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="h-10 shrink-0 rounded-lg border border-charcoal/15 px-4 text-sm font-semibold text-charcoal hover:border-charcoal/35"
                >
                  Toepassen
                </button>
              </div>
              {couponError && (
                <p className="text-xs font-medium text-red" role="alert">
                  {couponError}
                </p>
              )}
              <p className="text-xs text-muted">
                Demo-codes om te proberen: WELKOM10, GRATISBEZORGING, FRESH5.
              </p>
            </div>
          )}
        </fieldset>

        <fieldset id="checkout-tip" tabIndex={-1} className="flex min-w-0 flex-col gap-3 outline-none">
          <legend className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "8" : "7"}. Fooi
          </legend>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { id: "none", label: "Geen fooi" },
                { id: "5", label: "5%" },
                { id: "10", label: "10%" },
                { id: "15", label: "15%" },
                { id: "custom", label: "Anders" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => selectTip(option.id)}
                aria-pressed={form.tipOption === option.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  form.tipOption === option.id
                    ? "border-forest bg-forest text-warm-white"
                    : "border-border bg-warm-white text-charcoal hover:border-forest/40"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          {form.tipOption === "custom" && (
            <Field
              label="Fooibedrag"
              name="tipCustom"
              inputMode="decimal"
              value={form.tipCustom}
              onChange={(e) => update("tipCustom", e.target.value)}
              error={errors.tipCustom}
              placeholder="Bijv. 2,50"
            />
          )}
        </fieldset>

        <div id="checkout-review" tabIndex={-1} className="flex flex-col gap-3 rounded-2xl border border-border bg-cream/40 p-5 outline-none">
          <h2 className="font-display text-lg font-bold text-forest">
            {form.fulfillment === "bezorgen" ? "9" : "8"}. Controleer je bestelling
          </h2>
          <ReviewRow label="Ontvangst" value={form.fulfillment === "bezorgen" ? "Bezorgen" : "Afhalen"} target="checkout-fulfillment" />
          <ReviewRow
            label="Tijd"
            value={form.timeMode === "asap" ? "Zo snel mogelijk" : form.plannedTime || "—"}
            target="checkout-time"
          />
          <ReviewRow
            label="Contact"
            value={form.firstName ? `${form.firstName} ${form.lastName} · ${form.phone}` : "—"}
            target="checkout-contact"
          />
          {form.fulfillment === "bezorgen" && (
            <ReviewRow
              label="Adres"
              value={
                form.street
                  ? `${form.street} ${form.number}${form.addition ? `-${form.addition}` : ""}, ${form.postalCode} ${form.city}`
                  : "—"
              }
              target="checkout-address"
            />
          )}
          <ReviewRow label="Betaalmethode" value={paymentLabel} target="checkout-payment" />
          {appliedCoupon && (
            <ReviewRow label="Korting" value={`${appliedCoupon.code} — ${appliedCoupon.description}`} target="checkout-coupon" />
          )}
          <ReviewRow
            label="Fooi"
            value={tipAmount > 0 ? formatPrice(tipAmount) : "Geen fooi"}
            target="checkout-tip"
          />
          <div className="flex items-center justify-between border-t border-border pt-3 font-display text-base font-bold text-forest">
            <span>Totaal</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <aside className="flex flex-col gap-4 rounded-2xl border border-border bg-cream/40 p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start">
        <div className="flex shrink-0 items-center justify-between gap-2">
          <h2 className="font-display text-lg font-bold text-forest">Besteloverzicht</h2>
          <span className="rounded-full bg-forest/10 px-3 py-1 text-xs font-semibold text-forest">
            {form.fulfillment === "bezorgen" ? "Bezorgen" : "Afhalen"}
          </span>
        </div>
        {/* Scrollable so a long order can't push the total/submit button
            below the fold on desktop — those stay pinned below. */}
        <div className="min-h-0 flex-1 overflow-y-auto lg:min-h-[2.5rem]">
          {unavailable.length > 0 && (
            <div role="alert" className="mb-3 rounded-xl border border-red/30 bg-red/5 p-3 text-sm">
              <p className="font-semibold text-red">
                {unavailable.length === 1
                  ? "Eén product is niet meer beschikbaar."
                  : `${unavailable.length} producten zijn niet meer beschikbaar.`}
              </p>
              <button
                type="button"
                onClick={() => unavailable.forEach((u) => removeLine(u.line.lineId))}
                className="mt-1 text-xs font-semibold text-red underline underline-offset-2 hover:text-[#a53b26]"
              >
                Verwijder deze items
              </button>
            </div>
          )}
          <ul className="flex flex-col gap-2 text-sm">
            {lines.map((line) => (
              <li key={line.lineId} className="flex justify-between gap-3">
                <span className="text-charcoal/80">
                  {line.quantity}× {line.name}
                  {unavailableIds.has(line.lineId) && (
                    <span className="ml-1.5 rounded-full bg-red/10 px-2 py-0.5 text-xs font-semibold text-red">
                      Niet beschikbaar
                    </span>
                  )}
                </span>
                <span className="shrink-0 tabular-nums text-charcoal">
                  {formatPrice(line.unitPrice * line.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 flex-col gap-1 border-t border-border pt-3 text-sm">
          <div className="flex justify-between text-charcoal/80">
            <span>Subtotaal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="flex justify-between text-herb">
              <span>Korting</span>
              <span>−{formatPrice(discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-charcoal/80">
            <span>Bezorgkosten</span>
            <span>
              {form.fulfillment === "bezorgen" ? (
                deliveryFee === 0 ? (
                  <span className="text-herb">Gratis</span>
                ) : (
                  formatPrice(orderingConfig.deliveryFee)
                )
              ) : (
                "—"
              )}
            </span>
          </div>
          {tipAmount > 0 && (
            <div className="flex justify-between text-charcoal/80">
              <span>Fooi</span>
              <span>{formatPrice(tipAmount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 font-display text-base font-bold text-forest">
            <span>Totaal</span>
            <Price amount={total} />
          </div>
        </div>

        {minimumDeliveryUnmet && (
          <p className="shrink-0 text-xs font-medium text-red" role="alert">
            Minimale bestelling voor bezorgen is {formatPrice(orderingConfig.minimumDeliveryOrder)}. Voeg nog{" "}
            {formatPrice(orderingConfig.minimumDeliveryOrder - subtotal)} toe of kies afhalen.
          </p>
        )}

        {submitError && (
          <div className="shrink-0">
            <ErrorState description={submitError} />
          </div>
        )}

        <div className="hidden shrink-0 lg:block">
          <Button type="submit" size="lg" disabled={submitting || minimumDeliveryUnmet || unavailable.length > 0} className="w-full">
            {submitting ? "Bezig met plaatsen…" : `Bestelling plaatsen · ${formatPrice(total)}`}
          </Button>
        </div>
      </aside>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-warm-white/95 px-4 pt-3 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom, 0.75rem))" }}
      >
        <Button type="submit" size="lg" disabled={submitting || minimumDeliveryUnmet || unavailable.length > 0} className="w-full">
          {submitting ? "Bezig met plaatsen…" : `Bestelling plaatsen · ${formatPrice(total)}`}
        </Button>
      </div>
    </form>
  );
}

function ReviewRow({ label, value, target }: { label: string; value: string; target: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <div>
        <span className="text-muted">{label}: </span>
        <span className="font-medium text-charcoal">{value}</span>
      </div>
      <WijzigenButton target={target} />
    </div>
  );
}
