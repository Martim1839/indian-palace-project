import { Instagram, Facebook, MapPin, Phone, Clock } from "lucide-react";
import { INFO } from "@/lib/restaurant";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep pt-16 text-cream">
      <div className="pattern-mandala absolute inset-0 opacity-15" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-gold">Indian Palace</p>
            <p className="mt-3 text-sm text-cream/75">
              Cozinha indiana autêntica em Espinho. Receitas de família, especiarias verdadeiras e uma sala
              feita para ficar.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full border border-gold/40 transition-colors hover:bg-gold/15"
              >
                <Instagram className="size-4 text-gold" />
              </a>
              <a
                href={INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full border border-gold/40 transition-colors hover:bg-gold/15"
              >
                <Facebook className="size-4 text-gold" />
              </a>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg text-gold">Contactos</p>
            <p className="mt-3 flex gap-2 text-cream/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {INFO.address}
            </p>
            <a href={`tel:${INFO.phone}`} className="mt-3 flex gap-2 text-cream/75 hover:text-gold">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" /> {INFO.phoneDisplay}
            </a>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg text-gold">Horário</p>
            <ul className="mt-3 space-y-1 text-cream/75">
              {INFO.hours.map((h) => (
                <li key={h.day} className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-3.5 shrink-0 text-gold" />
                  <span>
                    {h.day}: {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm">
            <p className="font-display text-lg text-gold">Navegação</p>
            <ul className="mt-3 space-y-2 text-cream/75">
              {[
                { href: "#historia", label: "A Nossa História" },
                { href: "#ementa", label: "Ementa" },
                { href: "#galeria", label: "Galeria" },
                { href: "#avaliacoes", label: "Avaliações" },
                { href: "#reservar", label: "Reservar Mesa" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream/15 py-6 text-xs text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Indian Palace · Espinho, Portugal. Todos os direitos reservados.</p>
          <p>English spoken · Menu infantil · Esplanada</p>
        </div>
      </div>
    </footer>
  );
}
