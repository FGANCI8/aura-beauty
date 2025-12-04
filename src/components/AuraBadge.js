'use client';

import { useState } from 'react';
import { Sparkles, X, MessageCircle } from 'lucide-react';

export default function AuraBadge() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
            >
                <Sparkles size={24} className="text-yellow-200" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 max-w-sm w-full z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-white/95 backdrop-blur-xl border border-stone-200 shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-stone-900 p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-200 to-amber-100 flex items-center justify-center border-2 border-white/20">
                            <Sparkles size={20} className="text-stone-800" />
                        </div>
                        <div>
                            <h3 className="text-white font-serif text-sm">Aura</h3>
                            <p className="text-stone-400 text-xs">Assistente Virtual</p>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-5">
                    <p className="text-stone-600 text-sm leading-relaxed mb-4">
                        Olá! Sou a Aura, sua assistente exclusiva. Estou aqui para garantir que sua experiência seja perfeita.
                    </p>
                    <a
                        href="/booking"
                        className="block w-full bg-stone-100 hover:bg-stone-200 text-stone-900 text-center py-3 rounded-lg text-sm font-medium transition-colors"
                    >
                        Agendar meu horário
                    </a>
                </div>
            </div>
        </div>
    );
}
