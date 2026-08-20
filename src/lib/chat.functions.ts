import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ChatInput = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      }),
    )
    .max(30),
});

const SYSTEM_PROMPT = `És o assistente virtual do restaurante Indian Palace, cozinha indiana autêntica em Espinho, Portugal.
Tom: caloroso, hospitaleiro, breve (máx. 90 palavras), em português de Portugal (responde em inglês se o cliente escrever em inglês). Usa emojis com moderação.
Nunca uses o carácter travessão (—) nas respostas.

Informação do restaurante:
- Morada: Av. 8, 832, 4500-207 Espinho. Perto da praia e do centro de Espinho; há estacionamento na rua e a estação de comboios fica próxima.
- Telefone para reservas: +351 22 996 2071. Reservas feitas no formulário do site: o cliente recebe de imediato uma referência e a equipa confirma por telefone ou email. Também há mesas via TheFork.
- Serviços: comer no local e take away.
- Horário: Segunda fechado. Terça a Quinta 12:00–15:00 e 18:00–23:00. Sexta e Sábado 12:00–15:00 e 18:00–23:30. Domingo 12:00–15:00 e 18:00–23:00. Abertos aos domingos e também durante todo o mês de agosto.
- Esplanada exterior disponível (sujeita a lotação e tempo), ar condicionado, menu infantil, English spoken, aberto até tarde.
- Pratos: entradas (samosa, chicken tikka, onion bhaji), curries (Butter Chicken/Murgh Makhani é o prato-assinatura, suave; Lamb Rogan Josh bem picante; Palak Paneer vegetariano), biryanis aromáticos, tandoori do forno de barro, naans (alho, queijo), sobremesas (gulab jamun, kheer, kulfi de manga).
- Nível de picante ajustável a pedido: suave, médio ou picante.
- Muitas opções vegetarianas e várias veganas (chana masala, subz biryani, dal, legumes, sem manteiga/nata a pedido).
- Preço médio: 15–35 € por pessoa. Avaliação Google: 4,9 com 41 críticas.

Se não souberes algo, sugere contacto telefónico. Nunca confirmes reservas tu próprio: indica o formulário do site ou o telefone.`;

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ChatInput.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { ok: false as const, error: "O assistente não está configurado." };
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`AI gateway error [${response.status}]: ${body}`);
      if (response.status === 429) {
        return { ok: false as const, error: "Muitos pedidos neste momento. Tente novamente daqui a instantes." };
      }
      if (response.status === 402) {
        return {
          ok: false as const,
          error: "O assistente está temporariamente indisponível. Ligue-nos: +351 22 996 2071.",
        };
      }
      return { ok: false as const, error: "Não consegui responder agora. Ligue-nos: +351 22 996 2071." };
    }

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return { ok: false as const, error: "Não consegui responder agora. Tente novamente." };
    }
    return { ok: true as const, text };
  });
