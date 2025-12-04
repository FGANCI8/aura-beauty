"use client";

import { useState } from "react";

type Message = {
    id: number;
    from: "user" | "agent";
    text: string;
    mode?: "b2b" | "b2c";
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    async function sendMessage() {
        if (!input.trim() || loading) return;

        const userText = input.trim();
        setInput("");

        const newUserMessage: Message = {
            id: Date.now(),
            from: "user",
            text: userText,
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setLoading(true);

        try {
            const historyForApi = messages.map((m) => ({
                role: m.from === "user" ? "user" : "assistant",
                content: m.text,
            }));

            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userText,
                    history: historyForApi,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "Erro na API de chat");
            }

            const agentMessage: Message = {
                id: Date.now() + 1,
                from: "agent",
                text: data.reply || "Não consegui responder agora, tente novamente.",
                mode: data.mode,
            };

            setMessages((prev) => [...prev, agentMessage]);
        } catch (err) {
            console.error(err);
            const errorMessage: Message = {
                id: Date.now() + 2,
                from: "agent",
                text:
                    "Tive um problema técnico ao falar com a IA. Me avise que eu tento de novo ou verifico a configuração da chave OPENAI.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <>
            {/* Botão flutuante */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-4 right-4 z-50 rounded-full px-4 py-2 text-sm font-semibold shadow-lg bg-[#D4AF37] text-black"
            >
                {open ? "Fechar chat" : "Fale com a Aura"}
            </button>

            {/* Janela do chat */}
            {open && (
                <div className="fixed bottom-20 right-4 z-50 w-[320px] max-h-[480px] rounded-2xl shadow-2xl bg-white flex flex-col border border-neutral-200">
                    {/* Cabeçalho */}
                    <div className="px-4 py-3 rounded-t-2xl bg-gradient-to-r from-black to-neutral-800 text-white flex items-center justify-between">
                        <div>
                            <div className="text-sm font-semibold">Aura – Assistente</div>
                            <div className="text-[11px] text-neutral-300">
                                Ajudo você com o salão e com o sistema ✨
                            </div>
                        </div>
                    </div>

                    {/* Mensagens */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-[13px] bg-neutral-50">
                        {messages.length === 0 && (
                            <div className="text-[12px] text-neutral-500 text-center mt-4">
                                Me manda uma mensagem dizendo se você quer
                                <br />
                                <strong>serviços do salão</strong> ou o{" "}
                                <strong>sistema Renova Aura</strong>. 💇‍♀️💻
                            </div>
                        )}

                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-3 py-2 leading-snug ${m.from === "user"
                                            ? "bg-[#D4AF37] text-black"
                                            : "bg-white border border-neutral-200 text-neutral-900"
                                        }`}
                                >
                                    {m.text}
                                    {m.mode && m.from === "agent" && (
                                        <div className="mt-1 text-[10px] uppercase tracking-wide text-neutral-400">
                                            {m.mode === "b2b"
                                                ? "Modo: Renova Aura (sistema)"
                                                : "Modo: Salão (cliente final)"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="text-[11px] text-neutral-500 mt-2">
                                Aura está digitando…
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="border-t border-neutral-200 px-2 py-2 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 text-[13px] rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                            placeholder="Digite sua mensagem…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="text-[13px] px-3 py-2 rounded-xl bg-black text-white disabled:opacity-50"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
