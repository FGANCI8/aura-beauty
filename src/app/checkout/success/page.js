'use client';

import { Check, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function CheckoutSuccess() {
    useEffect(() => {
        // Confetti celebration
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#10b981', '#d4af37', '#000000']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#10b981', '#d4af37', '#000000']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <Check size={40} className="text-green-600" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Agendamento Confirmado!
                    </h1>

                    {/* Message */}
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Seu agendamento foi realizado com sucesso! Em breve você receberá uma confirmação no WhatsApp com todos os detalhes.
                    </p>

                    {/* Info Cards */}
                    <div className="space-y-4 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                            <div className="flex items-start gap-3">
                                <Calendar size={20} className="text-green-600 mt-0.5" />
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">Próximos Passos</p>
                                    <p className="text-sm text-gray-600">
                                        1. Você receberá uma mensagem no WhatsApp<br />
                                        2. Nossa equipe entrará em contato para confirmar<br />
                                        3. Compareça no horário agendado
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                            <div className="flex items-start gap-3">
                                <Check size={20} className="text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">Preparação</p>
                                    <p className="text-sm text-gray-600">
                                        Chegue 5 minutos antes do horário agendado para não perder seu atendimento.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="block w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
                        >
                            Voltar para Home
                        </Link>

                        <Link
                            href="/booking"
                            className="block w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                        >
                            Agendar Outro Serviço
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
