// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// ----------------------
// Detecta modo (salão x sistema)
// ----------------------
function detectMode(message: string): "b2b" | "b2c" | "unknown" {
    const text = message.toLowerCase();

    const b2cKeywords = [
        "corte",
        "escova",
        "hidratação",
        "botox capilar",
        "balayage",
        "coloração",
        "luzes",
        "mechas",
        "horário",
        "agendar",
        "preço do corte",
        "preço",
        "serviço",
        "salão",
        "agenda",
    ];

    const b2bKeywords = [
        "automação",
        "sistema",
        "painel",
        "dashboard",
        "renova aura",
        "aura beauty app",
        "software",
        "gestão",
        "agenda automática",
        "integrar",
        "mercado pago",
        "plano",
        "mensalidade",
    ];

    if (b2cKeywords.some((k) => text.includes(k))) return "b2c";
    if (b2bKeywords.some((k) => text.includes(k))) return "b2b";

    return "unknown";
}

// ----------------------
// Prompts de sistema
// ----------------------
function getSystemPrompt(mode: "b2b" | "b2c"): string {
    if (mode === "b2b") {
        return `
Você é um consultor de vendas experiente da Renova Aura, empresa de automação para salões de beleza.

FOCO:
- Explicar os benefícios do sistema Aura Beauty / Renova Aura.
- Falar de agendamento automático, painel admin, pagamentos, IA atendendo clientes.
- Quebrar objeções (preço, tempo, complexidade) com calma e segurança.
- Sempre puxar para um próximo passo: demonstração rápida, proposta, cálculo de ROI.

TOM DE VOZ:
- Profissional, confiante, consultivo.
- Linguagem simples, sem termos técnicos demais.
- Sempre mostrar valor ANTES de falar de preço.

ESTRUTURA DA RESPOSTA:
1) Saudação curta e personalizada.
2) Responder diretamente a dúvida da pessoa.
3) Mostrar 1–3 benefícios claros / exemplos práticos.
4) Fechar com uma chamada para ação (ex: agendar demo, perguntar sobre o salão, etc.).
`.trim();
    }

    // Modo B2C – cliente final do salão
    return `
Você é a recepcionista premium do salão de beleza Aura Beauty.

FOCO:
- Ajudar o cliente a escolher serviços (corte, coloração, hidratação etc.).
- Explicar os serviços de forma clara e empolgante, com sensação de luxo.
- Sugerir combinações e upgrades quando fizer sentido.
- Levar SEMPRE para agendamento de horário.

TOM DE VOZ:
- Acolhedor, simpático, premium (sem ser esnobe).
- Sempre cuidadoso, falando como um humano de verdade do salão.

ESTRUTURA DA RESPOSTA:
1) Saudação amigável.
2) Resposta direta à pergunta.
3) Um toque de valor extra (dica, benefício, algo que encante).
4) Fechar oferecendo horário ou próximo passo (ex: mandar horários disponíveis, reservar vaga, etc.).
`.trim();
}

// ----------------------
// Handler principal
// ----------------------
export async function POST(req: NextRequest) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OPENAI_API_KEY não configurada no .env.local" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const userMessage: string = body?.message ?? "";
        const history: { role: "user" | "assistant"; content: string }[] =
            body?.history ?? [];

        if (!userMessage || typeof userMessage !== "string") {
            return NextResponse.json(
                { error: "Mensagem inválida" },
                { status: 400 }
            );
        }

        // Detecta modo
        let mode = detectMode(userMessage);
        if (mode === "unknown") {
            // Se estiver ambíguo, assumimos que a pessoa é cliente do salão.
            mode = "b2c";
        }

        const systemPrompt = getSystemPrompt(mode);

        const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
            { role: "system", content: systemPrompt },
            ...history,
            { role: "user", content: userMessage },
        ];

        const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

        const completion = await client.chat.completions.create({
            model,
            messages,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content ?? "";

        return NextResponse.json({
            reply,
            mode,
        });
    } catch (err: unknown) {
        console.error("Erro na /api/chat:", err);
        return NextResponse.json(
            { error: "Erro ao gerar resposta do chat" },
            { status: 500 }
        );
    }
}
