# Productie-checklist — vóór livegang

Deze site draait nu in **demo mode** (`NEXT_PUBLIC_SITE_MODE=demo`). In demo
mode zijn placeholder-menu, placeholder-foto's en een demo-bestelflow
toegestaan zodat de eigenaar het volledige ontwerp kan beoordelen. Niets
hiervan mag automatisch mee naar productie — onderstaande punten moeten
allemaal zijn afgevinkt en `NEXT_PUBLIC_SITE_MODE=production` moet pas dan
gezet worden. `validateProductionContent()` in `data/business.ts` gooit een
build-fout als een aantal van deze punten nog openstaat.

## Kritiek — adres

- [ ] **Adresconflict oplossen.** Publieke bronnen rond het huidige bedrijf
      wijzen op `Leerparkpromenade 160, 3312 KW Dordrecht`. Een door de
      eigenaar aangeleverde Google-screenshot toonde
      `Maria Montessorilaan 160, 3312 KM Dordrecht`. De huidige website bevat
      bovendien inconsistente adresvermeldingen. Bevestig het juiste adres
      en zet `business.address.verified = true` in `data/business.ts`.

## Bedrijfsgegevens

- [ ] Telefoonnummer geverifieerd (`data/business.ts` → `phoneDisplay`/`phoneE164`)
- [ ] E-mailadres ingevuld (`business.email`)
- [ ] KVK-nummer en btw-nummer ingevuld
- [ ] `business.mapsUrl` ingevuld met de exacte Google Maps-link
- [ ] `business.googleReviewUrl` ingevuld met de exacte Google-reviewlink
- [ ] `business.googleRating` geverifieerd of verwijderd (nu indicatief:
      ~4.4/5, ~14 reviews — dit verandert continu en mag niet als vaststaand
      feit gepresenteerd worden)
- [ ] `business.attributes` (toegankelijkheid, wifi, parkeren, kindvriendelijk,
      etc.) bevestigd met de eigenaar en `business.attributes.verified = true`
      gezet
- [ ] Social links ingevuld of leeg gelaten (`business.socials`)

## Openingstijden

- [ ] Echte openingstijden per dag ingevuld in `data/opening-hours.ts`
      (`openingHours` is nu leeg — de site toont daarom bewust "Bekijk
      actuele openingstijden" in plaats van een verzonnen status)

## Menu

- [ ] Echte menu-items en prijzen ingevoerd (huidige data in
      `data/menu.demo.ts` is expliciet gemarkeerd `demo: true` en gebaseerd
      op een Dordrecht-benchmark, geen officiële Fresh & Tasty-prijzen)
- [ ] Allergie-informatie per gerecht ingevuld. Structuur staat klaar
      (`AllergenCode` in `types/index.ts`, labels in `data/allergens.ts`,
      `item.allergens` op elk product in `data/menu.demo.ts`) maar is voor
      elk item leeg gelaten — vul deze in vóórdat de site live gaat.
      Wettelijk verplicht bij online verkoop van onverpakte levensmiddelen
      (NVWA, 14 allergenencategorieën).
- [ ] Beschikbaarheid (`available`) per item gecontroleerd

## Foto's

- [ ] Zie `IMAGE_REQUIREMENTS.md` — elke placeholder-foto vervangen door een
      echte, rechtenvrije of eigen foto
- [ ] Echte logo geplaatst op `public/brand/logo.svg` en
      `components/ui/Logo.tsx` aangepast (zie `OWNER_EDIT_GUIDE.md` §9)

## Bestellen / betalen

- [ ] Een echte `OrderProvider` gekoppeld (`lib/order-provider.ts` —
      `DemoOrderProvider` wordt automatisch geblokkeerd zodra
      `NEXT_PUBLIC_SITE_MODE=production` staat; er moet dan een werkende
      `RealOrderProvider`-implementatie zijn, bijvoorbeeld een eigen API,
      Uber Eats/externe bestel-URL, of Mollie/Stripe/iDEAL)
- [ ] Betaalmethodes in `/checkout` kloppen met de daadwerkelijk
      ondersteunde methodes

## Coupons & loyaliteit (nu client-side demo)

- [ ] `data/coupons.demo.ts` bevat drie voorbeeldcoupons (WELKOM10,
      GRATISBEZORGING, FRESH5) die volledig in de browser worden
      gevalideerd (`lib/coupons.ts`). Er is geen echte gebruikslimiet per
      klant over meerdere apparaten, geen server-validatie en geen
      admin-beheer. Vervang dit door een server-side coupon-engine
      (met database, per-klant limiet, categoriebeperking, stacking-regels)
      voordat er echte kortingen worden weggegeven.
- [ ] De digitale stempelkaart (`lib/loyalty.ts`) telt stempels lokaal in
      de browser (localStorage) — dit is per apparaat, niet per klant, en
      een stempel wordt nu al bij het plaatsen van een demo-bestelling
      toegekend (niet pas na een bevestigde/betaalde order, en zonder
      fraudebescherming of admin-correctie). Vervang dit door een
      account- of telefoonnummer-gekoppelde loyaliteitsservice met een
      echte backend voordat dit als een echte klantenbeloning wordt
      aangeboden.

## Formulieren

- [ ] Catering-aanvraagformulier gekoppeld aan een echte e-mail/API-service
      (`components/catering/CateringForm.tsx`) — nu wordt niets verzonden of
      opgeslagen
- [ ] Contactformulier gekoppeld aan een echte e-mail/API-service
      (`components/contact/ContactForm.tsx`)
- [ ] Feedbackformulier na bestelling gekoppeld aan een echte
      e-mail/API-service of spreadsheet (`components/feedback/FeedbackForm.tsx`)
      — nu wordt niets verzonden of opgeslagen. Dit is bewust een eigen
      feedbackformulier, geen nepreview-widget; koppel het niet aan een
      openbare reviewpagina zonder toestemming van de klant.
- [ ] Server-side validatie en rate limiting toegevoegd zodra er een echte
      backend is (zie sectie 31 "Security" van de opdracht)

## Juridisch

- [ ] `/privacybeleid` laten controleren/schrijven door de eigenaar of een
      jurist (huidige tekst is een concept-structuur, geen goedgekeurd
      beleid)
- [ ] `/algemene-voorwaarden` laten controleren/schrijven door de eigenaar of
      een jurist
- [ ] Zodra beide pagina's definitief zijn: verwijder `robots: { index:
      false }` uit hun metadata in `app/privacybeleid/page.tsx` en
      `app/algemene-voorwaarden/page.tsx`

## SEO / indexering

- [ ] `NEXT_PUBLIC_SITE_URL` gezet naar het echte productiedomein
- [ ] `NEXT_PUBLIC_SITE_MODE=production` gezet (dit verandert `app/robots.ts`
      van "alles blokkeren" naar "site indexeerbaar, met sitemap")
- [ ] Structured data (`components/JsonLd.tsx`) opnieuw gecontroleerd zodra
      het adres geverifieerd is — het adresveld wordt pas automatisch
      toegevoegd zodra `business.address.verified = true` staat

## Techniek

- [ ] `npm run lint`, `npm run typecheck`, `npm run build` draaien allemaal
      zonder fouten (gecontroleerd tijdens deze build — zie de terminal-log
      van de sessie waarin dit is opgeleverd)
- [ ] Alle demo-badges/disclaimers ("Demo: deze bestelling is niet
      verzonden.", conceptteksten op de juridische pagina's) gecontroleerd en
      verwijderd waar niet meer van toepassing
