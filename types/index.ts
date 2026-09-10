export type SiteMode = "demo" | "production";

export type DietaryTag = "halal-option" | "vegetarian" | "vegan";

export type ModifierOption = {
  id: string;
  name: string;
  priceDelta: number;
};

export type ModifierGroup = {
  id: string;
  name: string;
  required: boolean;
  multiSelect: boolean;
  maxSelect?: number;
  includedSelections?: number;
  extraSelectionPrice?: number;
  options: ModifierOption[];
};

export type MenuCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type MenuItem = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  dietary: DietaryTag[];
  spicyLevel?: 0 | 1 | 2 | 3;
  popular?: boolean;
  available: boolean;
  demo: boolean;
  modifiers?: ModifierGroup[];
};

export type CartModifierSelection = {
  groupId: string;
  groupName: string;
  optionIds: string[];
  optionNames: string[];
  priceDelta: number;
};

export type CartLine = {
  lineId: string;
  itemId: string;
  name: string;
  unitPrice: number;
  quantity: number;
  notes?: string;
  selections: CartModifierSelection[];
};

export type FulfillmentMethod = "afhalen" | "bezorgen";

export type OrderPayload = {
  lines: CartLine[];
  fulfillment: FulfillmentMethod;
  contact: {
    name: string;
    phone: string;
    email?: string;
  };
  address?: {
    street: string;
    number: string;
    postalCode: string;
    city: string;
    notes?: string;
  };
  requestedTime: string;
  paymentMethod: "ideal" | "pin" | "contant";
  notes?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export type OrderResult = {
  success: boolean;
  orderNumber: string;
  demo: boolean;
};

export interface OrderProvider {
  submitOrder(order: OrderPayload): Promise<OrderResult>;
}

export type DayHours = {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  closed?: boolean;
  ranges: { open: string; close: string }[];
};

export type NavItem = {
  label: string;
  href: string;
};
