import { z } from "zod";

export const reservationSchema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(80),
  email: z.string().trim().email("Email inválido").max(160),
  phone: z.string().trim().min(6, "Telefone inválido").max(30),
  date: z.string().min(1, "Escolha a data"),
  time: z.string().min(1, "Escolha a hora"),
  people: z.string().min(1, "Indique o nº de pessoas"),
  area: z.string().min(1),
  occasion: z.string().optional(),
  message: z.string().trim().max(600).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
