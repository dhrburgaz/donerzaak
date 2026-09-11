import type { FulfillmentMethod, PaymentMethodId } from "@/types";

/** Set to false to hide "Contant bij afhalen" — some owners prefer pin-only. */
export const CASH_AT_PICKUP_ENABLED = true;

export type PaymentMethodDef = {
  id: PaymentMethodId;
  label: string;
  description: string;
  /** Which fulfillment methods this option is offered for. */
  availableFor: FulfillmentMethod[];
};

export const paymentMethods: PaymentMethodDef[] = [
  {
    id: "ideal",
    label: "iDEAL",
    description: "Snel en veilig via je eigen bank",
    availableFor: ["afhalen", "bezorgen"],
  },
  {
    id: "creditcard",
    label: "Creditcard",
    description: "Visa en Mastercard",
    availableFor: ["afhalen", "bezorgen"],
  },
  {
    id: "applepay",
    label: "Apple Pay",
    description: "Snel betalen met Apple Pay",
    availableFor: ["afhalen", "bezorgen"],
  },
  {
    id: "googlepay",
    label: "Google Pay",
    description: "Snel betalen met Google Pay",
    availableFor: ["afhalen", "bezorgen"],
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Betaal via je PayPal-account",
    availableFor: ["afhalen", "bezorgen"],
  },
  {
    id: "bancontact",
    label: "Bancontact",
    description: "Betaal met je Bancontact-kaart",
    availableFor: ["afhalen", "bezorgen"],
  },
  {
    id: "pin",
    label: "Pin bij afhalen",
    description: "Betaal wanneer je je bestelling ophaalt",
    availableFor: ["afhalen"],
  },
  ...(CASH_AT_PICKUP_ENABLED
    ? [
        {
          id: "contant" as const,
          label: "Contant bij afhalen",
          description: "Betaal contant wanneer je je bestelling ophaalt",
          availableFor: ["afhalen"] as FulfillmentMethod[],
        },
      ]
    : []),
];

export function paymentMethodsFor(fulfillment: FulfillmentMethod): PaymentMethodDef[] {
  return paymentMethods.filter((m) => m.availableFor.includes(fulfillment));
}
