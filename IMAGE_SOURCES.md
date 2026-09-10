# Foto-bronnen

## Waarom er nu geen echte foto's in de site staan

Deze build is gemaakt in een omgeving zonder toegang tot internet buiten een
beperkte set tools, en zonder door de eigenaar aangeleverde bestanden. Er is
bewust **niet** gekozen om te gokken naar stockfoto-URLs (bijvoorbeeld
willekeurige Unsplash/Pexels-links) omdat:

- geraden URL's vaak niet meer bestaan of naar iets anders wijzen,
- de licentie/toeschrijving dan niet te controleren is,
- een fout scenario ("een generieke stockfoto doorgeven als een echt
  Fresh & Tasty-gerecht") expliciet verboden is in de opdracht.

In plaats daarvan toont elke beeldplek een ontworpen gradiënt-placeholder
(`components/ui/FoodImage.tsx`) die er verzorgd uitziet, maar duidelijk
herkenbaar is als tijdelijk (zichtbaar via de naam die erop staat en de
`aria-label` die vermeldt dat het een demo-foto is).

## Aanbevolen volgorde voor echte foto's

1. **Eigen foto's van Fresh & Tasty** — de sterkste optie. Vraag de eigenaar
   om foto's van het echte assortiment, het pand en het personeel.
2. **Door de eigenaar aangeleverde foto's** — bijvoorbeeld bestaande foto's
   van de huidige website of social media (met toestemming/rechten).
3. **Alleen voor demo-doeleinden:** royalty-free foto's van een bron met een
   duidelijke licentie zoals Unsplash of Pexels. Download de foto's zelf via
   de officiële site/app (niet hotlinken), sla ze lokaal op in
   `public/images/`, en noteer per bestand:
   - de exacte bron-URL,
   - de fotograaf/licentie,
   - de downloaddatum.

   Voorbeeldtabel om aan te vullen zodra dit gebeurt:

   | Bestand | Bron-URL | Fotograaf | Licentie | Gedownload op |
   |---|---|---|---|---|
   | _(nog leeg)_ | | | | |

## Wat nooit mag

- Foto's overnemen van concurrenten (zie sectie 40 van de opdracht).
- Foto's van Google Maps-listings gebruiken zonder rechten.
- Watermerk-foto's gebruiken.
- Een generieke stockfoto presenteren alsof het een echt Fresh & Tasty
  product is in productie (mag alleen als expliciet gemarkeerde demo-content).
