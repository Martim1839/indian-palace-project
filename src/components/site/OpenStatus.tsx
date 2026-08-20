import { useEffect, useState } from "react";
import { OPEN_SLOTS } from "@/lib/restaurant";
import { cn } from "@/lib/utils";

function statusNow() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const slots = OPEN_SLOTS[now.getDay()] ?? [];
  const current = slots.find(([start, end]) => minutes >= start && minutes < end);
  if (current) {
    const closesIn = current[1] - minutes;
    return { open: true, label: closesIn <= 60 ? `Aberto · fecha em ${closesIn} min` : "Aberto agora" };
  }
  const next = slots.find(([start]) => start > minutes);
  if (next) {
    const h = Math.floor(next[0] / 60);
    const m = String(next[0] % 60).padStart(2, "0");
    return { open: false, label: `Fechado · abre às ${h}:${m}` };
  }
  return { open: false, label: "Fechado agora" };
}

export function OpenStatus({ className }: { className?: string }) {
  const [state, setState] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    setState(statusNow());
    const id = window.setInterval(() => setState(statusNow()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        state.open ? "bg-emerald/12 text-emerald" : "bg-secondary text-muted-foreground",
        className,
      )}
    >
      <span
        className={cn(
          "size-2 rounded-full",
          state.open ? "animate-pulse bg-emerald" : "bg-muted-foreground/60",
        )}
      />
      {state.label}
    </span>
  );
}
