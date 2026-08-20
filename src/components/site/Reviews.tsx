import { Star, Quote } from "lucide-react";
import { REVIEWS } from "@/lib/restaurant";
import { Reveal, Ornament } from "./Reveal";

export function Reviews() {
  return (
    <section id="avaliacoes" className="relative overflow-hidden bg-deep py-24">
      <div className="pattern-mandala absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Avaliações</p>
          <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">O que dizem os nossos clientes</h2>
          <Ornament className="mt-5" />
          <p className="mt-5 inline-flex items-center gap-2 text-sm text-cream/80">
            <span className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="size-4 fill-gold text-gold" />
              ))}
            </span>
            4,9 de 5 · 41 avaliações no Google
          </p>
        </Reveal>

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {REVIEWS.map((r, i) => (
            <Reveal
              key={r.name}
              delay={i * 80}
              className="min-w-[85%] snap-center sm:min-w-[60%] lg:min-w-0"
            >
              <article className="h-full rounded-3xl border border-gold/25 bg-cream/5 p-6 backdrop-blur">
                <Quote className="size-6 text-gold" />
                <p className="mt-4 text-sm leading-relaxed text-cream/90">{r.text}</p>
                <footer className="mt-5 border-t border-cream/15 pt-4">
                  <p className="font-display text-base text-gold">{r.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-cream/60">{r.origin}</p>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
