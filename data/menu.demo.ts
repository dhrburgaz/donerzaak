import type { MenuCategory, MenuItem, ModifierGroup } from "@/types";

/**
 * DEMO MENU DATA — NOT OFFICIAL FRESH & TASTY PRICES OR PRODUCTS.
 *
 * These items and prices are placeholders inspired by typical Dordrecht
 * döner/shoarma menu ranges (see PRODUCTION_CHECKLIST.md for the
 * benchmark sources). They exist so the owner can evaluate the full
 * design and ordering flow today. Every record carries `demo: true`.
 * Replace this file's contents with real menu data before production —
 * see OWNER_EDIT_GUIDE.md.
 */

export const menuCategories: MenuCategory[] = [
  { id: "kapsalon", name: "Kapsalon", slug: "kapsalon" },
  { id: "durum", name: "Dürüm", slug: "durum" },
  { id: "broodjes", name: "Broodjes", slug: "broodjes" },
  { id: "turkse-pizza", name: "Turkse pizza", slug: "turkse-pizza" },
  { id: "grill", name: "Grill & schotels", slug: "grill" },
  { id: "pizza", name: "Pizza", slug: "pizza" },
  { id: "burgers", name: "Burgers & snacks", slug: "burgers" },
  { id: "vegetarisch", name: "Vegetarisch", slug: "vegetarisch" },
  { id: "kindermenu", name: "Kindermenu", slug: "kindermenu" },
  { id: "bijgerechten", name: "Bijgerechten", slug: "bijgerechten" },
  { id: "sauzen", name: "Sauzen", slug: "sauzen" },
  { id: "dranken", name: "Dranken", slug: "dranken" },
  { id: "dessert-koffie", name: "Dessert & koffie", slug: "dessert-koffie" },
];

const sauceGroup: ModifierGroup = {
  id: "sauce",
  name: "Saus naar keuze",
  required: false,
  multiSelect: true,
  maxSelect: 4,
  includedSelections: 2,
  extraSelectionPrice: 0.9,
  options: [
    { id: "sauce-knoflook", name: "Knoflooksaus", priceDelta: 0 },
    { id: "sauce-sambal", name: "Sambal", priceDelta: 0 },
    { id: "sauce-cocktail", name: "Cocktailsaus", priceDelta: 0 },
    { id: "sauce-andalouse", name: "Andalouse", priceDelta: 0 },
  ],
};

const extrasGroupMeat: ModifierGroup = {
  id: "extras",
  name: "Extra's",
  required: false,
  multiSelect: true,
  options: [
    { id: "extra-vlees", name: "Extra vlees", priceDelta: 3.0 },
    { id: "extra-kaas", name: "Extra kaas", priceDelta: 1.0 },
    { id: "extra-jalapeno", name: "Jalapeño", priceDelta: 0.75 },
    { id: "extra-salade", name: "Extra salade", priceDelta: 1.0 },
  ],
};

const extrasGroupVeg: ModifierGroup = {
  id: "extras",
  name: "Extra's",
  required: false,
  multiSelect: true,
  options: [
    { id: "extra-kaas", name: "Extra kaas", priceDelta: 1.0 },
    { id: "extra-jalapeno", name: "Jalapeño", priceDelta: 0.75 },
    { id: "extra-salade", name: "Extra salade", priceDelta: 1.0 },
  ],
};

const schotelBaseGroup: ModifierGroup = {
  id: "schotel-base",
  name: "Friet of rijst",
  required: true,
  multiSelect: false,
  options: [
    { id: "base-friet", name: "Friet", priceDelta: 0 },
    { id: "base-rijst", name: "Rijst", priceDelta: 0 },
  ],
};

const menuUpgradeGroup: ModifierGroup = {
  id: "menu-upgrade",
  name: "Maak er een menu van?",
  required: false,
  multiSelect: false,
  options: [
    { id: "menu-upgrade-no", name: "Nee, alleen dit", priceDelta: 0 },
    { id: "menu-upgrade-yes", name: "Ja, met friet en een drankje", priceDelta: 3.5 },
  ],
};

const meatModifiers = [sauceGroup, extrasGroupMeat];
const vegModifiers = [sauceGroup, extrasGroupVeg];
const wrapModifiers = [sauceGroup, extrasGroupMeat, menuUpgradeGroup];
const wrapModifiersVeg = [sauceGroup, extrasGroupVeg, menuUpgradeGroup];

let counter = 0;
function id() {
  counter += 1;
  return `item-${counter}`;
}

function item(
  categoryId: string,
  name: string,
  price: number,
  description: string,
  opts: Partial<MenuItem> = {}
): MenuItem {
  return {
    id: id(),
    slug: name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
    categoryId,
    name,
    price,
    description,
    dietary: [],
    available: true,
    demo: true,
    ...opts,
  };
}

const defaultDurumDesc =
  "Versgerolde dürüm met vlees of hoofdingrediënt, frisse salade en saus naar keuze.";

export const menuItems: MenuItem[] = [
  // KAPSALON
  item(
    "kapsalon",
    "Kapsalon Kipdöner",
    11.95,
    "Kipdöner, friet, kaas, frisse salade en saus naar keuze.",
    { dietary: ["halal-option"], popular: true, modifiers: [...meatModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Kalfsdöner",
    12.45,
    "Kalfsdöner, friet, kaas, salade en saus naar keuze.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Shoarma",
    12.45,
    "Gekruide shoarma, friet, kaas, salade en saus.",
    { dietary: ["halal-option"], popular: true, modifiers: [...meatModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Mix",
    13.95,
    "Kipdöner en kalfsdöner, friet, kaas, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Falafel",
    10.95,
    "Falafel, friet, kaas, salade en saus.",
    { dietary: ["vegetarian", "halal-option"], modifiers: [...vegModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Kipdöner XL",
    14.95,
    "Extra grote portie kipdöner, friet, kaas, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Kalfsdöner XL",
    15.45,
    "Extra grote portie kalfsdöner, friet, kaas, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "kapsalon",
    "Kapsalon Shoarma XL",
    15.45,
    "Extra grote portie shoarma, friet, kaas, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),

  // DÜRÜM
  item("durum", "Dürüm Kipdöner", 9.25, defaultDurumDesc, {
    dietary: ["halal-option"],
    popular: true,
    modifiers: [...wrapModifiers],
  }),
  item("durum", "Dürüm Kalfsdöner", 9.75, defaultDurumDesc, {
    dietary: ["halal-option"],
    modifiers: [...wrapModifiers],
  }),
  item("durum", "Dürüm Shoarma", 9.95, defaultDurumDesc, {
    dietary: ["halal-option"],
    modifiers: [...wrapModifiers],
  }),
  item("durum", "Dürüm Adana", 10.95, defaultDurumDesc, {
    dietary: ["halal-option"],
    spicyLevel: 2,
    modifiers: [...wrapModifiers],
  }),
  item("durum", "Dürüm Köfte", 9.95, defaultDurumDesc, {
    dietary: ["halal-option"],
    modifiers: [...wrapModifiers],
  }),
  item("durum", "Dürüm Kipfilet", 10.5, defaultDurumDesc, {
    dietary: ["halal-option"],
    modifiers: [...wrapModifiers],
  }),
  item(
    "durum",
    "Dürüm Falafel",
    8.25,
    "Versgerolde dürüm met falafel, frisse salade en saus naar keuze.",
    { dietary: ["vegetarian", "vegan", "halal-option"], modifiers: [...wrapModifiersVeg] }
  ),

  // BROODJES
  item(
    "broodjes",
    "Broodje Kipdöner",
    7.25,
    "Vers afgebakken broodje met kipdöner, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...wrapModifiers] }
  ),
  item(
    "broodjes",
    "Broodje Kalfsdöner",
    7.75,
    "Vers afgebakken broodje met kalfsdöner, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...wrapModifiers] }
  ),
  item(
    "broodjes",
    "Broodje Shoarma",
    9.75,
    "Vers afgebakken broodje met gekruide shoarma, salade en saus.",
    { dietary: ["halal-option"], popular: true, modifiers: [...wrapModifiers] }
  ),
  item(
    "broodjes",
    "Broodje Köfte",
    8.75,
    "Vers afgebakken broodje met köfte, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...wrapModifiers] }
  ),
  item(
    "broodjes",
    "Broodje Kipfilet",
    9.25,
    "Vers afgebakken broodje met gegrilde kipfilet, salade en saus.",
    { dietary: ["halal-option"], modifiers: [...wrapModifiers] }
  ),
  item(
    "broodjes",
    "Broodje Falafel",
    6.95,
    "Vers afgebakken broodje met falafel, salade en saus.",
    { dietary: ["vegetarian", "vegan", "halal-option"], modifiers: [...wrapModifiersVeg] }
  ),

  // TURKSE PIZZA
  item("turkse-pizza", "Turkse Pizza Naturel", 4.75, "Dunne Turkse pizzabodem, naturel gebakken."),
  item("turkse-pizza", "Turkse Pizza Kaas", 5.75, "Dunne Turkse pizzabodem met gesmolten kaas.", {
    dietary: ["vegetarian"],
  }),
  item(
    "turkse-pizza",
    "Turkse Pizza Kipdöner",
    8.75,
    "Dunne Turkse pizzabodem met kipdöner en kaas.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "turkse-pizza",
    "Turkse Pizza Kalfsdöner",
    9.0,
    "Dunne Turkse pizzabodem met kalfsdöner en kaas.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "turkse-pizza",
    "Turkse Pizza Shoarma",
    9.0,
    "Dunne Turkse pizzabodem met gekruide shoarma en kaas.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),
  item(
    "turkse-pizza",
    "Turkse Pizza Mix",
    9.75,
    "Dunne Turkse pizzabodem met kipdöner, kalfsdöner en kaas.",
    { dietary: ["halal-option"], popular: true, modifiers: [...meatModifiers] }
  ),

  // GRILL & SCHOTELS
  item(
    "grill",
    "Schotel Kipdöner",
    15.95,
    "Kipdöner met friet of rijst, frisse salade en twee sauzen.",
    { dietary: ["halal-option"], modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Schotel Kalfsdöner",
    16.95,
    "Kalfsdöner met friet of rijst, salade en twee sauzen.",
    { dietary: ["halal-option"], modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Schotel Shoarma",
    17.95,
    "Gekruide shoarma met friet of rijst, salade en twee sauzen.",
    { dietary: ["halal-option"], popular: true, modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Adana Schotel",
    18.95,
    "Pittige Adana grillworst met friet of rijst, salade en twee sauzen.",
    { dietary: ["halal-option"], spicyLevel: 2, modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Köfte Schotel",
    17.95,
    "Gegrilde köfte met friet of rijst, salade en twee sauzen.",
    { dietary: ["halal-option"], modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Kipfilet Schotel",
    18.5,
    "Gegrilde kipfilet met friet of rijst, salade en twee sauzen.",
    { dietary: ["halal-option"], modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Mix Grill",
    22.95,
    "Ruime schotel met kipdöner, köfte en Adana, friet of rijst, salade en twee sauzen.",
    { dietary: ["halal-option"], popular: true, spicyLevel: 1, modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Gegrilde Spareribs Schotel",
    22.5,
    "Mals gegrilde spareribs met friet of rijst, salade en twee sauzen.",
    { modifiers: [schotelBaseGroup, ...meatModifiers] }
  ),
  item(
    "grill",
    "Falafel Schotel",
    14.95,
    "Falafel met friet of rijst, salade en twee sauzen.",
    { dietary: ["vegetarian", "vegan", "halal-option"], modifiers: [schotelBaseGroup, ...vegModifiers] }
  ),

  // PIZZA
  item("pizza", "Pizza Margherita", 11.95, "Tomatensaus, mozzarella en basilicum.", {
    dietary: ["vegetarian"],
  }),
  item("pizza", "Pizza Kipdöner", 14.95, "Tomatensaus, mozzarella en kipdöner.", {
    dietary: ["halal-option"],
    modifiers: [...meatModifiers],
  }),
  item("pizza", "Pizza Kalfsdöner", 15.25, "Tomatensaus, mozzarella en kalfsdöner.", {
    dietary: ["halal-option"],
    modifiers: [...meatModifiers],
  }),
  item("pizza", "Pizza Shoarma", 15.5, "Tomatensaus, mozzarella en gekruide shoarma.", {
    dietary: ["halal-option"],
    popular: true,
    modifiers: [...meatModifiers],
  }),
  item("pizza", "Pizza Sucuk", 14.5, "Tomatensaus, mozzarella en pittige sucuk.", {
    spicyLevel: 1,
    modifiers: [...meatModifiers],
  }),
  item("pizza", "Pizza Tonno", 14.5, "Tomatensaus, mozzarella, tonijn en ui.", {
    modifiers: [...vegModifiers],
  }),
  item(
    "pizza",
    "Pizza Vegetariana",
    13.95,
    "Tomatensaus, mozzarella en gegrilde groenten.",
    { dietary: ["vegetarian"], modifiers: [...vegModifiers] }
  ),

  // BURGERS & SNACKS
  item(
    "burgers",
    "Crispy Chicken Burger",
    8.95,
    "Krokante kipfilet, frisse salade en huissaus in een zacht broodje.",
    { dietary: ["halal-option"], modifiers: [...wrapModifiers] }
  ),
  item(
    "burgers",
    "Crispy Chicken Menu",
    12.95,
    "Crispy Chicken Burger met friet en een drankje.",
    { dietary: ["halal-option"], popular: true, modifiers: [...meatModifiers] }
  ),
  item("burgers", "Hotwings 6 stuks", 6.75, "6 pittige hotwings.", {
    dietary: ["halal-option"],
    spicyLevel: 2,
  }),
  item("burgers", "Hotwings 12 stuks", 12.5, "12 pittige hotwings.", {
    dietary: ["halal-option"],
    spicyLevel: 2,
  }),
  item("burgers", "Chicken Tenders 5 stuks", 7.95, "5 krokante chicken tenders.", {
    dietary: ["halal-option"],
  }),
  item("burgers", "Kipnuggets 6 stuks", 5.95, "6 krokante kipnuggets.", {
    dietary: ["halal-option"],
  }),

  // VEGETARISCH
  item(
    "vegetarisch",
    "Falafel Dürüm",
    8.25,
    "Versgerolde dürüm met falafel, frisse salade en saus naar keuze.",
    { dietary: ["vegetarian", "vegan", "halal-option"], modifiers: [...wrapModifiersVeg] }
  ),
  item(
    "vegetarisch",
    "Falafel Broodje",
    6.95,
    "Vers afgebakken broodje met falafel, salade en saus.",
    { dietary: ["vegetarian", "vegan", "halal-option"], modifiers: [...wrapModifiersVeg] }
  ),
  item(
    "vegetarisch",
    "Falafel Schotel",
    14.95,
    "Falafel met friet of rijst, salade en twee sauzen.",
    { dietary: ["vegetarian", "vegan", "halal-option"], modifiers: [schotelBaseGroup, ...vegModifiers] }
  ),
  item(
    "vegetarisch",
    "Vegetarische Kapsalon",
    10.95,
    "Gegrilde groenten, friet, kaas, salade en saus.",
    { dietary: ["vegetarian"], modifiers: [...vegModifiers] }
  ),
  item(
    "vegetarisch",
    "Grilled Veggie Wrap",
    8.95,
    "Wrap met gegrilde groenten, frisse salade en saus.",
    { dietary: ["vegetarian", "vegan"], modifiers: [...wrapModifiersVeg] }
  ),

  // KINDERMENU
  item(
    "kindermenu",
    "Kids Kipdöner Menu",
    8.95,
    "Kleine portie kipdöner, friet en een drankje.",
    { dietary: ["halal-option"] }
  ),
  item("kindermenu", "Kids Nuggets Menu", 8.5, "6 nuggets, friet en een drankje.", {
    dietary: ["halal-option"],
  }),
  item("kindermenu", "Kids Pizza Margherita", 8.5, "Kleine pizza margherita.", {
    dietary: ["vegetarian"],
  }),

  // BIJGERECHTEN
  item("bijgerechten", "Friet klein", 3.25, "Krokante friet, kleine portie.", {
    dietary: ["vegan", "vegetarian"],
  }),
  item("bijgerechten", "Friet groot", 4.25, "Krokante friet, grote portie.", {
    dietary: ["vegan", "vegetarian"],
  }),
  item("bijgerechten", "Rijst", 4.5, "Portie gestoomde rijst.", {
    dietary: ["vegan", "vegetarian"],
  }),
  item("bijgerechten", "Frisse salade", 5.5, "Frisse salade met huisdressing.", {
    dietary: ["vegan", "vegetarian"],
  }),
  item("bijgerechten", "Hummus met brood", 5.95, "Romige hummus met vers brood.", {
    dietary: ["vegan", "vegetarian"],
  }),
  item(
    "bijgerechten",
    "Loaded Fries Kipdöner",
    8.95,
    "Friet met kipdöner, kaas en saus.",
    { dietary: ["halal-option"], modifiers: [...meatModifiers] }
  ),

  // SAUZEN
  item("sauzen", "Knoflooksaus", 0.9, "Portie knoflooksaus."),
  item("sauzen", "Sambal", 0.9, "Portie sambal."),
  item("sauzen", "Cocktailsaus", 0.9, "Portie cocktailsaus."),
  item("sauzen", "Mayonaise", 0.9, "Portie mayonaise."),
  item("sauzen", "Andalouse", 0.9, "Portie andalouse."),

  // DRANKEN
  item("dranken", "Coca-Cola", 2.75, "33cl blikje.", { dietary: ["vegan", "vegetarian"] }),
  item("dranken", "Coca-Cola Zero", 2.75, "33cl blikje.", { dietary: ["vegan", "vegetarian"] }),
  item("dranken", "Fanta Orange", 2.75, "33cl blikje.", { dietary: ["vegan", "vegetarian"] }),
  item("dranken", "Sprite", 2.75, "33cl blikje.", { dietary: ["vegan", "vegetarian"] }),
  item("dranken", "Spa Blauw", 2.5, "50cl water, bruisvrij.", { dietary: ["vegan", "vegetarian"] }),
  item("dranken", "Spa Rood", 2.5, "50cl water, met bruis.", { dietary: ["vegan", "vegetarian"] }),
  item("dranken", "Ayran", 2.5, "Traditionele Turkse yoghurtdrank.", { dietary: ["vegetarian"] }),
  item("dranken", "Red Bull", 3.5, "25cl blikje.", { dietary: ["vegan", "vegetarian"] }),

  // DESSERT & KOFFIE
  item("dessert-koffie", "Baklava", 4.25, "Zoet Turks gebak met pistache.", {
    dietary: ["vegetarian"],
  }),
  item(
    "dessert-koffie",
    "Chocolade Lava Cake",
    5.5,
    "Warme chocoladecake met vloeibare kern.",
    { dietary: ["vegetarian"], popular: true }
  ),
  item("dessert-koffie", "IJs Dessert", 4.95, "Romig ijsdessert.", { dietary: ["vegetarian"] }),
  item("dessert-koffie", "Espresso", 2.6, "Italiaanse espresso.", { dietary: ["vegan", "vegetarian"] }),
  item("dessert-koffie", "Koffie", 2.85, "Vers gezette koffie.", { dietary: ["vegan", "vegetarian"] }),
  item("dessert-koffie", "Cappuccino", 3.25, "Espresso met opgeschuimde melk.", {
    dietary: ["vegetarian"],
  }),
  item("dessert-koffie", "Turkse Thee", 2.25, "Traditionele Turkse thee.", {
    dietary: ["vegan", "vegetarian"],
  }),
];
