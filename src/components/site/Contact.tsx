import { useState } from "react";
import { MapPin, Phone, Clock, Sun, CheckCircle2, Loader2, CalendarCheck } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { createReservation } from "@/lib/reservations.functions";
import { reservationSchema } from "@/lib/reservations-schema";
import { INFO, AREAS, OCCASIONS } from "@/lib/restaurant";
import { Reveal, Ornament } from "./Reveal";
import { OpenStatus } from "./OpenStatus";

const TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ reference: string; date: string; time: string; people: string } | null>(
    null,
  );
  const submitReservation = useServerFn(createReservation);

  const today = new Date().toISOString().slice(0, 10);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const raw = Object.fromEntries(form) as Record<string, string>;
    const parsed = reservationSchema.safeParse(raw);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Verifique os campos do pedido de reserva.");
      return;
    }

    setErrors({});
    setSending(true);
    const d = parsed.data;
    try {
      const result = await submitReservation({ data: d });
      if (!result.ok) {
        toast.error(result.error || "Não foi possível enviar o pedido. Tente novamente ou ligue-nos.");
        return;
      }
      setDone({ reference: result.reference, date: d.date, time: d.time, people: d.people });
      toast.success("Pedido de reserva registado!");
    } catch {
      toast.error("Não foi possível enviar o pedido. Tente novamente ou ligue-nos.");
    } finally {
      setSending(false);
    }
  };

  const field =
    "w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-ring/30";

  return (
    <section id="contactos" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-terracotta">Localização e Contactos</p>
          <h2 className="mt-4 font-display text-3xl text-foreground sm:text-4xl">
            Reserve a sua mesa em Espinho
          </h2>
          <Ornament className="mt-5" />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <div className="overflow-hidden rounded-3xl shadow-warm">
              <iframe
                title="Mapa do Indian Palace"
                src={INFO.mapsEmbed}
                loading="lazy"
                className="h-64 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-warm">
              <h3 className="flex items-center gap-2 font-display text-xl text-foreground">
                <MapPin className="size-5 text-primary" /> Onde estamos
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{INFO.address}</p>
              <a
                href={INFO.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-terracotta hover:text-primary"
              >
                Obter direções →
              </a>

              <h3 className="mt-6 flex flex-wrap items-center gap-2 font-display text-xl text-foreground">
                <Clock className="size-5 text-primary" /> Horário
                <OpenStatus className="ml-auto" />
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {INFO.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 text-muted-foreground">
                    <span>{h.day}</span>
                    <span className="text-right text-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-3 py-1.5 text-xs font-semibold text-emerald">
                  <Sun className="size-3.5" /> Aberto aos domingos
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/25 px-3 py-1.5 text-xs font-semibold text-accent-foreground">
                  Aberto em agosto
                </span>
              </div>

              <div className="mt-6">
                <a
                  href={`tel:${INFO.phone}`}
                  className="inline-flex items-center gap-2 rounded-full bg-spice px-5 py-3 text-sm font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-105"
                >
                  <Phone className="size-4" /> {INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div id="reservar" className="scroll-mt-28">
              {done ? (
                <div className="rounded-3xl border border-emerald/35 bg-card p-8 text-center shadow-warm">
                  <CheckCircle2 className="mx-auto size-12 text-emerald" />
                  <h3 className="mt-4 font-display text-2xl text-foreground">Pedido recebido!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Vamos confirmar por telefone ou email nas próximas horas. Guarde a sua referência:
                  </p>
                  <p className="mt-4 inline-block rounded-2xl bg-secondary px-5 py-3 font-display text-2xl tracking-[0.2em] text-primary">
                    {done.reference}
                  </p>
                  <p className="mt-4 text-sm text-foreground">
                    {done.date} · {done.time} · {done.people}{" "}
                    {done.people === "1" ? "pessoa" : "pessoas"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setDone(null)}
                    className="mt-6 rounded-full border border-gold/50 px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent/20"
                  >
                    Fazer outro pedido
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="rounded-3xl border border-border bg-card p-6 shadow-warm sm:p-8"
                  noValidate
                >
                  <h3 className="flex items-center gap-2 font-display text-2xl text-foreground">
                    <CalendarCheck className="size-6 text-primary" /> Pedido de reserva
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reserve diretamente aqui no site: recebe uma referência imediata e a nossa equipa
                    confirma de seguida.
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Nome</span>
                      <input name="name" className={field} maxLength={80} placeholder="O seu nome" />
                      {errors["name"] ? (
                        <span className="mt-1 block text-xs text-destructive">{errors["name"]}</span>
                      ) : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Email</span>
                      <input
                        name="email"
                        type="email"
                        className={field}
                        maxLength={160}
                        placeholder="email@exemplo.pt"
                      />
                      {errors["email"] ? (
                        <span className="mt-1 block text-xs text-destructive">{errors["email"]}</span>
                      ) : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Telefone</span>
                      <input name="phone" className={field} maxLength={30} placeholder="+351 …" />
                      {errors["phone"] ? (
                        <span className="mt-1 block text-xs text-destructive">{errors["phone"]}</span>
                      ) : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Nº de pessoas</span>
                      <select name="people" className={field} defaultValue="2">
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9+"].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Data</span>
                      <input name="date" type="date" min={today} className={field} defaultValue={today} />
                      {errors["date"] ? (
                        <span className="mt-1 block text-xs text-destructive">{errors["date"]}</span>
                      ) : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Hora</span>
                      <select name="time" className={field} defaultValue="19:30">
                        {TIMES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      {errors["time"] ? (
                        <span className="mt-1 block text-xs text-destructive">{errors["time"]}</span>
                      ) : null}
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Zona</span>
                      <select name="area" className={field} defaultValue="sala">
                        {AREAS.map((a) => (
                          <option key={a.value} value={a.value}>
                            {a.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm">
                      <span className="mb-1.5 block font-medium">Ocasião (opcional)</span>
                      <select name="occasion" className={field} defaultValue="">
                        <option value="">Sem ocasião especial</option>
                        {OCCASIONS.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-sm sm:col-span-2">
                      <span className="mb-1.5 block font-medium">Mensagem (opcional)</span>
                      <textarea
                        name="message"
                        rows={3}
                        maxLength={600}
                        className={field}
                        placeholder="Cadeira de bebé, alergias, nível de picante…"
                      />
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-spice py-3.5 font-semibold text-primary-foreground shadow-warm transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {sending ? <Loader2 className="size-4 animate-spin" /> : null}
                    {sending ? "A enviar…" : "Confirmar pedido de reserva"}
                  </button>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    Os seus dados são usados apenas para gerir a reserva.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
