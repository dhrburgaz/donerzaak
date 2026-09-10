# Foto-vereisten voor productie

Alle beeldvlakken op deze site tonen op dit moment een ontworpen
gradiënt-placeholder (`components/ui/FoodImage.tsx`) in plaats van een echte
foto. Dit is bewust: er was in deze omgeving geen toegang tot
freshtasty.nl en er zijn geen door de eigenaar aangeleverde bestanden, en
gokken naar stockfoto-URLs zonder duidelijke licentie is onveilig (dode
links, verkeerde foto's, onduidelijke rechten). Zie `IMAGE_SOURCES.md` voor
hoe je dit wél goed oplost.

## Wat moet vervangen worden voordat de site live gaat

- [ ] Logo (`components/ui/Logo.tsx` → zie `OWNER_EDIT_GUIDE.md` §9)
- [ ] Hero-foto's op de homepage (3 stuks, `components/sections/Hero.tsx`)
- [ ] Bestseller-kaarten (homepage, gebruikt automatisch de eerste 6
      `popular: true` menu-items)
- [ ] Menukaart-teaser categoriefoto's (`components/sections/MenuTeaser.tsx`)
- [ ] Elke menu-itemfoto (`/menu`, `/bestellen`, product-detailscherm) — één
      foto per gerecht in `data/menu.demo.ts` / toekomstige `data/menu.ts`
- [ ] Catering-sectie foto (homepage + `/catering`)
- [ ] Locatie/restaurantfoto (homepage + `/contact`)
- [ ] Open Graph deelafbeelding (`app/opengraph-image.tsx` — nu een
      gegenereerde tekst-variant, prima als tussenoplossing maar een echte
      sfeerfoto werkt beter op social media)

## Hoe je een foto koppelt

1. Zet het bestand in `public/images/` (bijv. `public/images/kapsalon-kipdoner.jpg`).
2. Vervang in de betreffende component `<FoodImage label="..." seed="..." />`
   door `<Image src="/images/kapsalon-kipdoner.jpg" alt="..." fill
   className="object-cover" />` (gebruik `next/image`).
3. Voeg voor lokale afbeeldingen met een querystring (`?v=1` e.d.) een
   `images.localPatterns` regel toe in `next.config.ts` — zie de Next.js 16
   documentatie (`next/image` changes) als dit nodig is.

## Stijlrichtlijn (zodra er echte foto's zijn)

- Close-up shoarma/döner met zichtbare gegrilde randen
- Warm grilllicht, geen steriele witte achtergrond
- Verse sla/tomaat/kruiden, krokante friet, gesmolten kaas bij kapsalon
- Handen die serveren/inpakken voor sfeer
- Natuurlijke schaduwen, beheerste verzadiging
- Gebruik alleen een donker/warm overlay op foto's waar tekst overheen staat
