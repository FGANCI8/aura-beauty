import { NextResponse } from 'next/server';

// This is a placeholder for AI integration
// In production, integrate with OpenAI, Gemini, or your preferred LLM

export async function POST(request) {
    try {
        const { message, context } = await request.json();

        // Detect context: B2B (Renova Aura) or B2C (Salon Services)
        const mode = detectMode(message);

        // Generate response based on mode
        const response = await generateResponse(message, mode, context);

        return NextResponse.json({
            response,
            mode,
            suggestions: generateSuggestions(mode)
        });

    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function detectMode(message) {
    const lowerMessage = message.toLowerCase();

    // B2B keywords (Renova Aura system)
    const b2bKeywords = [
        'automação', 'sistema', 'painel', 'gestão', 'renova aura',
        'como funciona o sistema', 'implementação', 'painel admin',
        'preço do sistema', 'demonstração', 'integração'
    ];

    // B2C keywords (Salon services)
    const b2cKeywords = [
        'corte', 'escova', 'coloração', 'hidratação', 'horário',
        'agendar', 'preço de', 'botox', 'balayage', 'tratamento'
    ];

    // Check B2B
    if (b2bKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'b2b'; // Renova Aura mode
    }

    // Check B2C
    if (b2cKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'b2c'; // Salon mode
    }

    // Ambiguous - ask for clarification
    return 'ambiguous';
}

async function generateResponse(message, mode, context) {
    // This should be replaced with actual AI integration
    // For now, return contextual placeholder responses

    if (mode === 'ambiguous') {
        return "Para eu te ajudar melhor: você está procurando **serviços do salão** (corte, coloração, tratamentos) ou quer conhecer nosso **sistema de automação Renova Aura**? 😊";
    }

    if (mode === 'b2b') {
        // Renova Aura mode - sell the system
        return `Olá! 👋

O Renova Aura é um sistema completo de automação para salões de beleza!

✨ **Principais benefícios:**
- Agendamento online 24/7 (seus clientes agendam sozinhos!)
- Painel administrativo completo
- Integração com Mercado Pago
- IA para atendimento automático
- Site luxuoso personalizado

📊 **Resultados reais:**
- +40% em agendamentos
- -60% tempo de gestão manual
- +25% no faturamento

Posso te mostrar uma **demonstração ao vivo** de 10 minutos? Você vai se impressionar! 🚀`;
    }

    if (mode === 'b2c') {
        // Salon mode - sell services
        return `Oi! 😊

Que bom ter você aqui! O Aura Beauty oferece tratamentos premium com resultados incríveis!

💇‍♀️ **Nossos serviços mais procurados:**
- Corte Arquitetado - R$ 180
- Balayage Premium - R$ 580
- Hidratação Glow - R$ 220
- Botox Capilar - R$ 350

Qual serviço te interessa mais? Posso reservar um horário pra você! ✨`;
    }

    return "Como posso ajudar você hoje? 😊";
}

function generateSuggestions(mode) {
    if (mode === 'b2b') {
        return [
            "Ver demonstração",
            "Preços e planos",
            "Cases de sucesso",
            "Agendar reunião"
        ];
    }

    if (mode === 'b2c') {
        return [
            "Ver horários",
            "Listar todos os serviços",
            "Falar no WhatsApp",
            "Ver promoções"
        ];
    }

    return [
        "Serviços do salão",
        "Sistema Renova Aura"
    ];
}
