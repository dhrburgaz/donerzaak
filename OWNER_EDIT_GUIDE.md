# Eigenaarshandleiding — Fresh & Tasty Dordrecht website

Deze gids legt uit waar je content aanpast, zonder in de UI-code te hoeven
zoeken. Alle bedrijfsgegevens, menu, openingstijden en navigatie staan
centraal in de map `/data`.

## 1. Telefoonnummer, adres, socials, KVK/BTW

Bestand: `data/business.ts`

```ts
export const business = {
  phoneDisplay: "078 205 5001",
  phoneE164: "+31782055001",
  address: { street: "...", number: "...", postalCode: "...", city: "..." },
  socials: { instagram: "", facebook: "" },
  kvk: "",
  vat: "",
  ...
}
```

Pas deze waarden aan en ze verschijnen automatisch overal op de site
(header, footer, contactpagina, structured data). **Zet nooit een adres of
telefoonnummer los ergens anders in de code.**

Belangrijk: `business.address.verified` staat op `false` omdat er een
adresconflict is (zie `PRODUCTION_CHECKLIST.md`). Zet dit pas op `true`
nadat het juiste adres is bevestigd.

## 2. Openingstijden

Bestand: `data/opening-hours.ts`

Er staan nu **geen** openingstijden ingevuld — de site laat dan netjes
"Bekijk actuele openingstijden" zien in plaats van een verzonnen tijd. Vul
`openingHours` in zodra de tijden bevestigd zijn, bijvoorbeeld:

```ts
export const openingHours: DayHours[] = [
  { day: 1, ranges: [{ open: "11:00", close: "21:30" }] }, // maandag
  { day: 2, ranges: [{ open: "11:00", close: "21:30" }] },
  // ... dinsdag t/m zaterdag
  { day: 0, closed: true }, // zondag
];
```

`day` gebruikt de JavaScript-conventie: 0 = zondag, 1 = maandag, ... 6 = zaterdag.

## 3. Menu-items en prijzen

Bestand: `data/menu.demo.ts` (huidige demo-data) en `data/menu.ts` (selector).

Elk item wordt gemaakt met de `item()` helper:

```ts
item("kapsalon", "Kapsalon Kipdöner", 11.95, "Kipdöner, friet, kaas, ...", {
  dietary: ["halal-option"],
  popular: true,
  modifiers: [...meatModifiers],
});
```

- Eerste argument: categorie-id (zie `menuCategories` bovenin het bestand).
- Prijs is een getal in euro's (bijv. `11.95`).
- `dietary`: combinatie van `"halal-option"`, `"vegetarian"`, `"vegan"`.
- `modifiers`: koppel `meatModifiers`, `vegModifiers` of `schotelBaseGroup` voor
  saus/extra's-keuzes, of laat leeg voor een simpel product (bijv. een blikje
  cola).
- `allergens`: lijst van allergeencodes uit `data/allergens.ts`, bijv.
  `allergens: ["gluten", "milk"]`. Leeg = "nog niet bevestigd" in de UI.
  Vul dit per gerecht in zodra je de allergenen van dat product zeker weet —
  dit is wettelijk verplicht voor onverpakt eten dat je online verkoopt.

**Voor productie:** maak een los bestand `data/menu.ts` met echte producten
zonder `demo: true`, of laat een ontwikkelaar de `demo: true` items
vervangen. `validateProductionContent()` en de build controleren hier niet
automatisch op, maar de `siteMode` bepaalt welke set actief is.

### Categorieën

Bovenaan `data/menu.demo.ts` staat `menuCategories`. Voeg, verwijder of
hernoem categorieën hier; de menupagina en homepage-teaser volgen
automatisch.

## 4. Bestel-URL / externe bestelkoppeling

Bestand: `data/business.ts` → `uberEatsUrl`, en `lib/order-provider.ts` voor
een eigen besteladapter. Zolang er geen echte order-backend is, blijft de
site in `DemoOrderProvider` draaien (zie `PRODUCTION_CHECKLIST.md`).

## 5. Catering-contact

De catering-aanvraag komt nu nergens binnen (geen e-mail/API gekoppeld).
Koppel een e-mailservice of formulierverwerker in
`components/catering/CateringForm.tsx` (zoek naar de `handleSubmit`-functie)
en documenteer de koppeling in `PRODUCTION_CHECKLIST.md`.

## 6. Social links

Bestand: `data/business.ts` → `socials.instagram`, `socials.facebook`. Leeg
laten = de link verschijnt niet in de footer.

## 7. Google Maps link & Google review link

Bestand: `data/business.ts` → `mapsUrl`, `googleReviewUrl`. Zolang deze leeg
zijn, genereert de site automatisch een nette zoek-URL op basis van het
adres/bedrijfsnaam. Vul de exacte Google Maps/Business-links in zodra je ze
hebt voor een preciezere koppeling.

## 8. Navigatie

Bestand: `data/navigation.ts`. Voeg of verwijder een item in `mainNav` /
`footerNav` en het verschijnt automatisch in header, mobiel menu en footer.

## 9. Logo

De bestaande Fresh & Tasty-logo kon in deze omgeving niet worden opgehaald
(geen netwerktoegang tot freshtasty.nl). `components/ui/Logo.tsx` toont nu
een tijdelijk wordmark. Vervang dit:

1. Zet het echte logobestand (bij voorkeur SVG, anders hoge-resolutie PNG)
   in `public/brand/logo.svg`.
2. Vervang de inhoud van `components/ui/Logo.tsx` door een `<Image
   src="/brand/logo.svg" ... />` die naar dat bestand verwijst.

## 10. Foto's

Alle productfoto's zijn nu ontwerp-placeholders (kleurverloop + naam), geen
echte foto's — zie `IMAGE_REQUIREMENTS.md` en `IMAGE_SOURCES.md` voor de
volledige lijst en hoe je ze vervangt.

## 11. Demo-coupons

Bestand: `data/coupons.demo.ts`. Voeg een object toe met `code`, `type`
(`"percentage"`, `"fixed"` of `"free-delivery"`), `value` en een
`description`. Optioneel: `minOrder`, `firstOrderOnly`, `expiresAt`. Dit
werkt volledig in de browser (geen echte gebruikslimiet per klant) — prima
voor een demo/verkoopgesprek, niet voor echte kortingsacties. Zie
PRODUCTION_CHECKLIST.md.

## 12. Digitale stempelkaart

Bestand: `lib/loyalty.ts` → `STAMPS_REQUIRED` (aantal stempels) en
`REWARD_DESCRIPTION` (wat de klant krijgt). Telt nu lokaal in de browser
mee, niet per account — zie PRODUCTION_CHECKLIST.md voor wat nodig is om
dit als een echte klantenbeloning te gebruiken.

## 13. Installeerbare app (PWA)

De site is installeerbaar op telefoon/desktop ("Toevoegen aan startscherm").
Bestanden: `app/manifest.ts` (naam, kleuren, iconen) en
`scripts/generate-icons.mjs` (genereert de PNG-iconen in `public/icons/`
uit het bestaande merk-icoon). Wil je een eigen logo als app-icoon
gebruiken, pas dan de `WRAP_GLYPH`/kleuren in `scripts/generate-icons.mjs`
aan en draai `node scripts/generate-icons.mjs` opnieuw.

## 14. Catering-FAQ

Bestand: `app/catering/page.tsx` → array `faqItems`. Voeg een object toe
met `question` en `answer` om een nieuwe vraag toe te voegen; dit wordt
automatisch getoond in het uitklapmenu én meegenomen in de FAQ-structured
data voor Google.

## 15. Feedbackformulier na bestelling

Bestand: `components/feedback/FeedbackForm.tsx`, getoond op de
bedankpagina na een demo-bestelling. Dit is een eigen, kleine feedbacktool
(sterren + opmerking) — geen nepreviews en geen koppeling met Google
Reviews. Nu wordt niets verzonden of opgeslagen; zie
PRODUCTION_CHECKLIST.md om dit aan een echte inbox/sheet te koppelen.
