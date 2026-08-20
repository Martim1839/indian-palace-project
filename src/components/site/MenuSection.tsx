import { useState } from "react";
import { Flame, Leaf, Crown } from "lucide-react";
import { MENU } from "@/lib/restaurant";
import { cn } from "@/lib/utils";
import { Reveal, Ornament } from "./Reveal";

function Spice({ level }: { level: 0 | 1 | 2 | 3 }) {
  const labels = ["Suave", "Suave", "Médio", "Picante"];
  return (
    <span className="inline-flex items-center gap-1" title={`Picante: ${labels[level]}`}>
      {[1, 2, 3].map((i) => (
        <Flame
          key={i}
          className={cn("size-3.5", i <= level ? "text-primary" : "text-muted-foreground/30")}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Nível de picante: {labels[level]}</span>
    </span>
  );
}

export function MenuSection() {
  const [active, setActive] = useState(MENU[0]!.id);
  const category = MENU.find((c) => c.id === active) ?? MENU[0]!;

  return (
    <section id="ementa" className="relative bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Ementa</p>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
            Da entrada ao doce, tudo feito na hora
          </h2>
          <Ornament className="mt-5" />
          <p className="mx-auto mt-5 max-w-lg text-sm text-muted-foreground">
            Ajustamos o nível de picante ao seu gosto. Pratos vegetarianos assinalados com folha verde.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {MENU.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95",
                active === c.id
                  ? "bg-spice text-primary-foreground shadow-warm"
                  : "border border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground",
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div key={category.id}>
          <p className="animate-menu-enter mt-6 text-center text-xs uppercase tracking-[0.2em] text-terracotta">
            {category.note ? `${category.note} · ` : ""}
            {category.items.length} {category.items.length === 1 ? "prato" : "pratos"}
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {category.items.map((item, i) => (
              <article
                key={item.orig}
                style={{ animationDelay: `${i * 70}ms` }}
                className={cn(
                  "animate-menu-enter group h-full rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1",
                  item.signature
                    ? "border-gold/60 bg-deep text-cream shadow-lift"
                    : "border-border bg-card shadow-warm hover:shadow-lift",
                )}
              >
                {item.signature ? (
                  <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-spice px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                    <Crown className="size-3.5" /> Prato-assinatura
                  </p>
                ) : null}
                <div className="flex items-baseline gap-3">
                  <h3
                    className={cn(
                      "font-display text-xl",
                      item.signature ? "text-gold" : "text-foreground",
                    )}
                  >
                    {item.pt}
                  </h3>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex-1 -translate-y-1 border-b border-dotted",
                      item.signature ? "border-cream/35" : "border-foreground/25",
                    )}
                  />
                  <span
                    className={cn(
                      "shrink-0 font-display text-lg",
                      item.signature ? "text-cream" : "text-terracotta",
                    )}
                  >
                    {item.price}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-1 text-xs italic",
                    item.signature ? "text-cream/70" : "text-muted-foreground",
                  )}
                >
                  ({item.orig})
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    item.signature ? "text-cream/85" : "text-muted-foreground",
                  )}
                >
                  {item.desc}
                </p>
                <div className="mt-4 flex items-center gap-4">
                  {typeof item.spice === "number" ? <Spice level={item.spice} /> : null}
                  {item.veg ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald">
                      <Leaf className="size-3.5" /> Vegetariano
                    </span>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
