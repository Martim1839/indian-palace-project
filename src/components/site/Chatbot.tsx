import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Phone, CalendarHeart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useServerFn } from "@tanstack/react-start";
import { askAssistant } from "@/lib/chat.functions";
import { INFO } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

const WELCOME =
  "Namaste! 🙏 Sou o assistente virtual do Indian Palace. Posso ajudar com reservas, a nossa ementa ou horários. Como posso ajudar?";

const QUICK = [
  "Qual é o horário?",
  "Onde ficam e como chego?",
  "Têm opções vegetarianas?",
  "Como reservo uma mesa?",
  "Têm esplanada?",
  "Têm menu infantil?",
];

type Msg = { role: "user" | "assistant"; content: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ask = useServerFn(askAssistant);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !loading) inputRef.current?.focus();
  }, [open, loading]);

  const send = async (text: string) => {
    const clean = text.trim().slice(0, 500);
    if (!clean || loading) return;
    const next = [...messages, { role: "user" as const, content: clean }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await ask({
        data: { messages: next.slice(-12).map((m) => ({ role: m.role, content: m.content })) },
      });
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.ok ? result.text : result.error },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Peço desculpa, não consegui responder agora. Ligue-nos para ${INFO.phoneDisplay} e ajudamos de imediato. 🙏`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open ? (
        <div className="fixed inset-x-3 bottom-3 z-[60] flex max-h-[80svh] flex-col overflow-hidden rounded-3xl border border-gold/30 bg-card shadow-lift sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[24rem]">
          <div className="flex items-center gap-3 bg-spice px-4 py-3.5 text-primary-foreground">
            <span className="grid size-9 place-items-center rounded-full bg-black/20 font-display">IP</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base leading-tight">Assistente Indian Palace</p>
              <p className="text-[0.7rem] opacity-85">Reservas · Ementa · Horários</p>
            </div>
            <button type="button" aria-label="Fechar chat" onClick={() => setOpen(false)}>
              <X className="size-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-background px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-3xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-gold/30 bg-accent/15 text-foreground",
                  )}
                >
                  {m.role === "assistant" ? (
                    <div className="[&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:ml-4 [&_ul]:list-disc">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-3xl border border-gold/30 bg-accent/15 px-4 py-2.5 text-sm text-muted-foreground">
                  A escrever…
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-border bg-card px-3 pb-3 pt-2">
            <div className="mb-2 flex gap-2 overflow-x-auto pb-1">
              {QUICK.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void send(q)}
                  className="shrink-0 rounded-full border border-gold/45 px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-accent/25"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={500}
                placeholder="Escreva a sua pergunta…"
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Enviar"
                disabled={loading || !input.trim()}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-spice text-primary-foreground disabled:opacity-50"
              >
                <Send className="size-4" />
              </button>
            </form>
            <a
              href={`tel:${INFO.phone}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-emerald/40 py-2 text-xs font-semibold text-emerald transition-colors hover:bg-emerald/10"
            >
              <Phone className="size-3.5" /> Falar com um humano · {INFO.phoneDisplay}
            </a>
          </div>
        </div>
      ) : null}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <a
          href="#reservar"
          className="inline-flex items-center gap-2 rounded-full bg-deep px-4 py-3 text-sm font-semibold text-cream shadow-lift transition-transform hover:scale-105"
        >
          <CalendarHeart className="size-4 text-gold" /> Reserva rápida
        </a>
        {!open ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir assistente virtual"
            className="grid size-14 place-items-center rounded-full bg-spice text-primary-foreground shadow-lift transition-transform hover:scale-110"
          >
            <MessageCircle className="size-6" />
          </button>
        ) : null}
      </div>
    </>
  );
}
