import { Button } from "@/components/ui/Button";
import { FoodImage } from "@/components/ui/FoodImage";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
      <FoodImage
        label="Pagina niet gevonden"
        seed="404"
        className="aspect-[4/3] w-full rounded-3xl"
        textClassName="text-base"
      />
      <div>
        <p className="font-display text-6xl font-bold text-forest">404</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-charcoal">
          Deze pagina bestaat niet (meer)
        </h1>
        <p className="mt-2 text-charcoal/70">
          Misschien is de link verouderd. Ga terug naar het menu of de homepage.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/menu" size="lg">
          Bekijk menu
        </Button>
        <Button href="/" variant="outline" size="lg">
          Naar de homepage
        </Button>
      </div>
    </div>
  );
}
