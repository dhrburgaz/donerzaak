# Mollie integratiegids

Deze site is nu een **statische export** (`output: "export"` in `next.config.ts`),
gehost op GitHub Pages: geen server, geen API-routes, geen database. Dat betekent
dat een échte Mollie-koppeling **niet vanuit deze codebase alleen** kan draaien —
Mollie's private API-key mag nooit in de browser terechtkomen, dus er moet ergens
een server bijkomen die de betaling namens de klant aanmaakt.

Dit document beschrijft precies wat daarvoor nodig is. Tot die tijd blijft de site
volledig functioneel in **demo-modus** (zie `lib/payments/demo-provider.ts`) —
niemand hoeft op Mollie te wachten om de bestelervaring te kunnen testen of
verkopen.

## 1. Architectuur die al klaarstaat

- `types/index.ts` — `PaymentProvider` interface, `CreatePaymentInput`,
  `PaymentResult`, `PaymentStatus`.
- `lib/payments/demo-provider.ts` — simuleert een betaling, nooit een echte
  transactie.
- `lib/payments/mollie-provider.ts` — lege adapter die bewust een duidelijke
  fout gooit zolang hij niet is aangesloten op een echte backend.
- `lib/payments/index.ts` — kiest de provider op basis van
  `NEXT_PUBLIC_PAYMENT_PROVIDER` (`"demo"` of `"mollie"`), en weigert
  hardnekkig de demo-provider in productiemodus.
- `components/order/CheckoutForm.tsx` — roept alleen `getPaymentProvider()`
  aan, nooit Mollie rechtstreeks. De UI hoeft dus niet aangepast te worden
  wanneer de echte provider wordt aangesloten.

## 2. Wat je moet toevoegen om echt te kunnen betalen

### a. Een server (verplicht)

Kies een hosting die server-routes ondersteunt (Vercel, Netlify Functions,
een Node-server, etc.) — GitHub Pages kan dit niet. Dit betekent dat de site
niet langer `output: "export"` kan zijn zodra Mollie live gaat; App Router
API-routes werken prima op de bovenstaande platforms zonder de rest van de
site te hoeven herbouwen.

### b. Environment variables (server-only, nooit `NEXT_PUBLIC_`)

```
MOLLIE_API_KEY=live_xxx        # of test_xxx tijdens het testen
MOLLIE_WEBHOOK_SECRET=...      # optioneel, afhankelijk van je verificatiestrategie
NEXT_PUBLIC_PAYMENT_PROVIDER=mollie
NEXT_PUBLIC_SITE_URL=https://freshtasty.nl
```

`MOLLIE_API_KEY` mag **nooit** met het `NEXT_PUBLIC_`-prefix gezet worden —
dat zou hem in de client-bundle plaatsen en publiekelijk zichtbaar maken.

### c. Server-side betaling aanmaken

Voeg een API-route toe, bijvoorbeeld `/api/payments/create`:

```ts
// app/api/payments/create/route.ts (voorbeeld — pas aan op je backend)
import { createMollieClient } from "@mollie/api-client";

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY! });

export async function POST(request: Request) {
  const { amount, description, orderNumber, method } = await request.json();

  const payment = await mollieClient.payments.create({
    amount: { currency: "EUR", value: amount.toFixed(2) },
    description,
    method, // map PaymentMethodId -> Mollie's eigen method-namen
    redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/return?order=${orderNumber}`,
    webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/webhook`,
    metadata: { orderNumber },
  });

  return Response.json({ checkoutUrl: payment.getCheckoutUrl(), paymentId: payment.id });
}
```

Dan wordt `MolliePaymentProvider.createPayment()` in
`lib/payments/mollie-provider.ts` simpelweg een `fetch("/api/payments/create", …)`
naar deze route, en stuurt de checkout-form de klant door naar
`checkoutUrl` in plaats van meteen naar `/bestelling/gelukt`.

### d. Webhook

Voeg `/api/payments/webhook` toe: Mollie stuurt hier een POST met het
`id` van de betaling zodra de status verandert. De route haalt de betaling
op via `mollieClient.payments.get(id)` en werkt de eigen orderstatus bij
(database, niet localStorage — zie sectie e). Retourneer altijd **200 OK**,
ook bij een mislukte betaling, anders blijft Mollie het opnieuw proberen.

### e. Order-opslag hoort niet meer in localStorage

`lib/order-history.ts` gebruikt nu `localStorage` — prima voor een demo op
één apparaat, maar niet geschikt zodra er geld omgaat: het is niet
gesynchroniseerd tussen apparaten, niet beveiligd, en niet zichtbaar voor
het personeel. Vervang dit door een echte database (Supabase, Postgres,
etc.) zodra er een backend is; de `StoredOrder`-vorm kan als schema-basis
dienen.

### f. Return-pagina

`/payment/return` (nieuwe route) leest de `order`-queryparameter, checkt de
actuele status via je backend (niet blind vertrouwen op de redirect — de
webhook is de bron van waarheid) en toont dezelfde bevestigingservaring als
`/bestelling/gelukt`.

### g. Betaalmethode-namen

`data/payment-methods.ts` gebruikt eigen ids (`ideal`, `creditcard`, …).
Mollie heeft haar eigen method-constanten (`ideal`, `creditcard`,
`applepay`, `paypal`, `bancontact`, …) — controleer de Mollie-documentatie
voor de exacte namen en map ze in de server-route, niet in de UI.

## 3. Testmodus vóór livegang

Gebruik altijd eerst een Mollie **test API-key** (`test_...`) en Mollie's
testkaarten/iDEAL-testbank voordat je op `live_...` overschakelt. Zet
`NEXT_PUBLIC_SITE_MODE=production` pas nadat de hele flow end-to-end is
getest met een test-key.

## 4. Productieveiligheid die al is ingebouwd

- `lib/payments/index.ts` gooit een harde fout als
  `NEXT_PUBLIC_SITE_MODE=production` staat terwijl
  `NEXT_PUBLIC_PAYMENT_PROVIDER` niet op `"mollie"` staat — er kan dus nooit
  per ongeluk een neplive-betaling worden "geaccepteerd".
- `lib/order-provider.ts` heeft dezelfde bescherming voor het aanmaken van
  demo-bestellingen.
- `MolliePaymentProvider.createPayment()` gooit bewust een duidelijke fout
  zolang hij niet is aangesloten — een verkeerd geconfigureerde build faalt
  zichtbaar in plaats van een betaling stilzwijgend te faken.

## 5. Samenvatting van te bouwen routes

| Route | Doel |
|---|---|
| `POST /api/payments/create` | Betaling aanmaken bij Mollie, checkout-URL teruggeven |
| `POST /api/payments/webhook` | Statusupdates van Mollie ontvangen, order bijwerken |
| `GET /payment/return` | Klant terug laten landen, status opnieuw verifiëren |

Zie ook `PRODUCTION_CHECKLIST.md` voor de bredere lijst van wat nodig is
voor een echte livegang (adres, openingstijden, juridische pagina's, etc.).
