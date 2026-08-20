import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { IMAGES } from "@/lib/restaurant";
import { cn } from "@/lib/utils";
import { Reveal, Ornament } from "./Reveal";

export function Gallery() {
  const photos = IMAGES.gallery;
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft") setActive((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, photos.length]);

  const current = active === null ? null : photos[active];

  return (
    <section id="galeria" className="bg-background py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Galeria</p>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
            A sala, a esplanada e a mesa
          </h2>
          <Ornament className="mt-5" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Toque em qualquer fotografia para a ver em ecrã inteiro.
          </p>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-5xl auto-rows-[180px] grid-cols-2 justify-center gap-3 sm:auto-rows-[210px] md:grid-cols-4">
          {photos.map((img, i) => (
            <Reveal
              key={img.slot}
              delay={i * 50}
              className={cn(
                "h-full",
                img.span === "tall" && "row-span-2",
                img.span === "wide" && "col-span-2",
              )}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Ver foto: ${img.alt}`}
                className="group relative block size-full overflow-hidden rounded-2xl shadow-warm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover object-center transition-transform duration-700 [image-rendering:auto] group-hover:scale-105"
                />
                <span className="absolute inset-0 grid place-items-center bg-deep/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ZoomIn className="size-6 text-gold" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-deep/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[80svh] w-auto max-w-full rounded-2xl object-contain shadow-lift"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="mt-4 text-center text-sm text-cream/85">{current.alt}</p>

          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-gold/40 text-cream"
          >
            <X className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
            }}
            className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-gold/40 text-cream sm:left-8"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Foto seguinte"
            onClick={(e) => {
              e.stopPropagation();
              setActive((i) => ((i ?? 0) + 1) % photos.length);
            }}
            className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-gold/40 text-cream sm:right-8"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
