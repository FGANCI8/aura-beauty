'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'agent',
            text: 'Olá! 👋 Sou a Aura, sua assistente inteligente. Como posso ajudar você hoje?',
            mode: 'neutral'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            text: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            const data = await res.json();

            const agentMessage = {
                id: Date.now() + 1,
                type: 'agent',
                text: data.response,
                mode: data.mode,
                suggestions: data.suggestions
            };

            setMessages(prev => [...prev, agentMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'agent',
                text: 'Desculpe, tive um problema. Pode tentar novamente? 😊'
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSuggestion = (suggestion) => {
        setInput(suggestion);
    };

    return (
        <>
            {/* Chat Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 bg-champagne-gold text-black-elegant p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group"
                >
                    <MessageCircle size={24} />
                    <span className="hidden group-hover:block text-sm font-bold whitespace-nowrap">
                        Fale com a Aura
                    </span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-black-elegant to-gray-800 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Sparkles className="text-champagne-gold" size={24} />
                                <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                            </div>
                            <div>
                                <div className="font-bold">Aura AI</div>
                                <div className="text-xs text-gray-300">Online • Responde na hora</div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id}>
                                <div className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                                            ? 'bg-champagne-gold text-black-elegant'
                                            : 'bg-white text-black-elegant border border-gray-200'
                                            }`}
                                    >
                                        <div className="whitespace-pre-wrap">{msg.text}</div>
                                    </div>
                                </div>

                                {/* Suggestions */}
                                {msg.suggestions && msg.suggestions.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-2 ml-2">
                                        {msg.suggestions.map((suggestion, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSuggestion(suggestion)}
                                                className="px-3 py-1 bg-white border border-champagne-gold text-champagne-gold text-xs rounded-full hover:bg-champagne-gold hover:text-black-elegant transition-colors"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white p-3 rounded-2xl border border-gray-200">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-champagne-gold transition-colors"
                                disabled={loading}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={loading || !input.trim()}
                                className="bg-champagne-gold text-black-elegant p-2 rounded-full hover:bg-black-elegant hover:text-champagne-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <div className="text-center text-xs text-gray-400 mt-2">
                            Powered by Renova Aura AI
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
