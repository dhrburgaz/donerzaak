const points = [
  {
    title: "Dagelijks vers bereid",
    description: "Geen diepvriesmaaltijden — alles wordt dezelfde dag klaargemaakt.",
  },
  {
    title: "Halal opties",
    description: "Ruime keuze aan gerechten met halal optie.",
  },
  {
    title: "Vegetarisch & vegan opties",
    description: "Falafel, groenten en meer voor elke eettafel.",
  },
  {
    title: "Snel afhalen",
    description: "Bestel online en haal het zo op, zonder te wachten.",
  },
  {
    title: "Ook voor catering",
    description: "Van teamlunch tot verjaardag, wij verzorgen het.",
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
            <div
              key={point.title}
              className={`flex flex-col gap-2 rounded-2xl bg-warm-white/5 p-5 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <span className="font-display text-2xl font-bold text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-semibold">{point.title}</p>
              <p className="text-sm text-warm-white/70">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
