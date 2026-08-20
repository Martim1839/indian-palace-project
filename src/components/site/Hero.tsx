import { Star, Languages, Baby, Sun } from "lucide-react";
import { IMAGES } from "@/lib/restaurant";
import { Ornament } from "./Reveal";

const BADGES = [
  { icon: Languages, label: "English Spoken" },
  { icon: Baby, label: "Menu Infantil Disponível" },
  { icon: Sun, label: "Esplanada Exterior" },
];

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* hero-01.jpg: substituir por foto real do prato de assinatura */}
      <img
        src={IMAGES.hero}
        alt="Butter Chicken servido no Indian Palace"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/65 to-black/70" />
      <div className="pattern-mandala absolute inset-0 opacity-25" />

      <div className="relative mx-auto w-full max-w-4xl px-5 pb-16 pt-28 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/30 px-4 py-1.5 text-xs uppercase tracking-[0.28em] text-gold">
          <Star className="size-3.5 fill-gold" /> 4,9 · 41 avaliações
        </p>
        <h1 className="mt-6 font-display text-4xl leading-tight text-cream sm:text-6xl md:text-7xl">
          Os Sabores Autênticos <span className="block text-gold">da Índia</span>
        </h1>
        <Ornament className="mt-6" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
          Receitas de família passadas de geração em geração, especiarias moídas todos os dias e o calor
          do forno tandoor, no centro de Espinho.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#reservar"
            className="w-full rounded-full bg-spice px-8 py-3.5 font-semibold text-primary-foreground shadow-lift transition-transform duration-300 hover:scale-105 sm:w-auto"
          >
            Reservar Mesa
          </a>
          <a
            href="#ementa"
            className="w-full rounded-full border border-cream/40 px-8 py-3.5 font-semibold text-cream transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto"
          >
            Ver Ementa
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {BADGES.map((b) => (
            <li
              key={b.label}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-black/35 px-4 py-2 text-xs font-medium text-cream/90 backdrop-blur"
            >
              <b.icon className="size-3.5 text-gold" />
              {b.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
