import { IMAGES } from "@/lib/restaurant";
import { Reveal, Ornament } from "./Reveal";

export function About() {
  return (
    <section id="historia" className="relative overflow-hidden bg-background py-24">
      <div className="pattern-mandala pointer-events-none absolute -right-24 top-10 size-72 opacity-40" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">A Nossa História</p>
          <h2 className="mt-4 font-display text-3xl leading-snug text-foreground sm:text-4xl">
            Uma viagem de especiarias, memórias e família
          </h2>
          <Ornament className="mt-6 justify-start" />
          <div className="mt-6 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground">
            <p>
              O Indian Palace nasceu do desejo de trazer a Espinho a cozinha que aprendemos em casa: caris
              lentamente estufados, massalas tostadas na hora e pão saído do forno de barro ao ritmo da sala.
            </p>
            <p>
              Cada receita chegou até nós de geração em geração, do Punjab a Caxemira, da costa do Kerala às
              ruas de Hyderabad. Nada de atalhos: gengibre, alho e coentros frescos todos os dias, e o
              equilíbrio de picante ajustado ao seu gosto.
            </p>
            <p>
              Recebemos-lhe numa sala íntima de luz quente, com esplanada exterior para as noites amenas e
              espaço para toda a família, incluindo menu infantil e equipa que fala inglês.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { k: "20+", v: "Receitas de família" },
              { k: "4,9★", v: "41 avaliações Google" },
              { k: "15–35 €", v: "Por pessoa" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-border bg-card p-4 text-center shadow-warm">
                <p className="font-display text-xl text-terracotta">{s.k}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.v}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          {/* sobre-01.jpg: substituir por foto real do interior/esplanada */}
          <img
            src={IMAGES.about}
            alt="Sala de jantar do Indian Palace com mesas postas"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift"
            loading="lazy"
          />
          <div className="absolute -bottom-6 left-6 right-10 rounded-2xl bg-deep p-5 shadow-lift">
            <p className="font-display text-lg text-gold">"Magia da Índia nos sabores dos pratos."</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">Avaliação Google</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
