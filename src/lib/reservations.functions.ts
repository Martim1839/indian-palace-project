import { createServerFn } from "@tanstack/react-start";
import { reservationSchema } from "./reservations-schema";
import { validateReservationSlot } from "./restaurant";

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => reservationSchema.parse(data))
  .handler(async ({ data }) => {
    const slot = validateReservationSlot(data.date, data.time);
    if (!slot.ok) {
      return { ok: false as const, error: slot.error };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        reservation_date: data.date,
        reservation_time: data.time,
        people: data.people,
        area: data.area,
        occasion: data.occasion || null,
        message: data.message || null,
      })
      .select("reference")
      .single();

    if (error || !row) {
      console.error("Falha ao registar reserva:", error?.message);
      return { ok: false as const, error: "Não foi possível registar a reserva. Tente novamente." };
    }
    return { ok: true as const, reference: row.reference };
  });
