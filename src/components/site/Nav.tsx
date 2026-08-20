import { useEffect, useState } from "react";
import {
  Menu as MenuIcon,
  X,
  Phone,
  ChevronDown,
  ArrowUp,
  CalendarHeart,
  UtensilsCrossed,
  MapPin,
  Instagram,
  Facebook,
} from "lucide-react";
import { INFO } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#historia", label: "A Nossa História" },
  { href: "#ementa", label: "Ementa" },
  { href: "#galeria", label: "Galeria" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contactos", label: "Contactos" },
];

const LOGO_MENU = [
  { href: "#top", label: "Voltar ao topo", icon: ArrowUp },
  { href: "#reservar", label: "Reservar mesa", icon: CalendarHeart },
  { href: "#ementa", label: "Ver ementa", icon: UtensilsCrossed },
  { href: "#contactos", label: "Contactos e mapa", icon: MapPin },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!logoOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLogoOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [logoOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-deep/95 shadow-warm backdrop-blur-md" : "bg-gradient-to-b from-black/55 to-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <div className="relative">
          <button
            type="button"
            onClick={() => setLogoOpen((v) => !v)}
            aria-expanded={logoOpen}
            aria-haspopup="menu"
            aria-label="Menu rápido do Indian Palace"
            className="group flex items-center gap-3 text-left"
          >
            <span className="grid size-10 place-items-center rounded-full bg-spice font-display text-lg text-primary-foreground shadow-warm transition-transform duration-300 group-hover:scale-105">
              IP
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg tracking-wide text-cream">Indian Palace</span>
              <span className="block text-[0.65rem] uppercase tracking-[0.28em] text-gold">Porto · Índia</span>
            </span>
            <ChevronDown
              className={cn("size-4 text-gold transition-transform duration-300", logoOpen && "rotate-180")}
              aria-hidden="true"
            />
          </button>

          {logoOpen ? (
            <>
              <button
                type="button"
                aria-label="Fechar menu rápido"
                tabIndex={-1}
                onClick={() => setLogoOpen(false)}
                className="fixed inset-0 z-40 cursor-default"
              />
              <div
                role="menu"
                className="animate-menu-enter absolute left-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-3xl border border-gold/25 bg-deep p-2 shadow-lift"
              >
                {LOGO_MENU.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setLogoOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-cream/90 transition-colors hover:bg-cream/10 hover:text-gold"
                  >
                    <item.icon className="size-4 text-gold" aria-hidden="true" />
                    {item.label}
                  </a>
                ))}
                <a
                  href={`tel:${INFO.phone}`}
                  role="menuitem"
                  onClick={() => setLogoOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-cream/90 transition-colors hover:bg-cream/10 hover:text-gold"
                >
                  <Phone className="size-4 text-gold" aria-hidden="true" />
                  Ligar · {INFO.phoneDisplay}
                </a>
                <div className="my-2 border-t border-cream/10" />
                <div className="flex items-center gap-2 px-2 pb-1">
                  <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cream/50">Siga-nos</span>
                  <a
                    href={INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram do Indian Palace"
                    className="grid size-9 place-items-center rounded-full border border-gold/30 text-cream/85 transition-colors hover:bg-cream/10 hover:text-gold"
                  >
                    <Instagram className="size-4" />
                  </a>
                  <a
                    href={INFO.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook do Indian Palace"
                    className="grid size-9 place-items-center rounded-full border border-gold/30 text-cream/85 transition-colors hover:bg-cream/10 hover:text-gold"
                  >
                    <Facebook className="size-4" />
                  </a>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-cream/85 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservar"
            className="rounded-full bg-spice px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition-transform duration-300 hover:scale-105"
          >
            Reservar Mesa
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${INFO.phone}`}
            aria-label="Telefonar"
            className="grid size-10 place-items-center rounded-full border border-gold/40 text-cream"
          >
            <Phone className="size-4" />
          </a>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full bg-spice text-primary-foreground"
          >
            {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-gold/20 bg-deep/98 px-5 pb-6 pt-2 lg:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-cream/10 py-3 font-display text-lg text-cream"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservar"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-spice py-3 text-center font-semibold text-primary-foreground"
          >
            Reservar Mesa
          </a>
        </div>
      ) : null}
    </header>
  );
}
