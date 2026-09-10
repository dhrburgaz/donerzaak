import { FoodIcon, type IconKind } from "@/components/ui/FoodIcons";
import { Reveal } from "@/components/ui/Reveal";

const points: { title: string; description: string; icon: IconKind }[] = [
  {
    title: "Dagelijks vers bereid",
    description: "Geen diepvriesmaaltijden — alles wordt dezelfde dag klaargemaakt.",
    icon: "skewerPlate",
  },
  {
    title: "Halal opties",
    description: "Ruime keuze aan gerechten met halal optie.",
    icon: "tray",
  },
  {
    title: "Vegetarisch & vegan opties",
    description: "Falafel, groenten en meer voor elke eettafel.",
    icon: "saladBowl",
  },
  {
    title: "Snel afhalen",
    description: "Bestel online en haal het zo op, zonder te wachten.",
    icon: "fries",
  },
  {
    title: "Ook voor catering",
    description: "Van teamlunch tot verjaardag, wij verzorgen het.",
    icon: "pizzaSlice",
  },
];

export function WhyFreshTasty() {
  return (
    <section className="bg-forest text-warm-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">
          Waarom Fresh &amp; Tasty
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {points.map((point, i) => (
            <Reveal key={point.title} delayMs={i * 70} className={i === 0 ? "lg:col-span-2" : ""}>
              <div className="flex h-full flex-col gap-3 rounded-2xl bg-warm-white/5 p-5 transition-colors hover:bg-warm-white/10">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/90">
                  <FoodIcon kind={point.icon} className="h-6 w-6" />
                </span>
                <p className="font-semibold">{point.title}</p>
                <p className="text-sm text-warm-white/70">{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
