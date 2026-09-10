# Foto-vereisten voor productie

Alle beeldvlakken op deze site tonen op dit moment een illustratief
"icon-op-kleurkaart" ontwerp (`components/ui/FoodImage.tsx` +
`components/ui/FoodIcons.tsx`) in plaats van een echte foto: elk gerecht
krijgt een op maat getekend icoon (döner-wrap, kapsalon-bak, pizzapunt,
burger, etc. — zie `FoodIcons.tsx` voor de volledige set en de
naam/categorie-matching) op een kleur passend bij de categorie. Dit is
bewust zo gebouwd in plaats van foto's: er was in deze omgeving geen
toegang tot freshtasty.nl, geen door de eigenaar aangeleverde bestanden en
geen tool om AI-afbeeldingen te genereren. Gokken naar stockfoto-URLs
zonder duidelijke licentie is bovendien onveilig (dode links, verkeerde
foto's, onduidelijke rechten). Zie `IMAGE_SOURCES.md` voor hoe je dit wél
goed oplost. De illustraties zijn een bewuste ontwerpkeuze om de site nu al
levendig en smakelijk te laten aanvoelen — vervang ze naar wens door echte
foto's, of houd de iconen aan als vast onderdeel van de huisstijl.

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
