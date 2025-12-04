'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Star, Award, Sparkles, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store';
import Link from 'next/link';

export default function AtendimentoPage() {
    const [services, setServices] = useState([]);
    const { addItem } = useCartStore();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            if (res.ok) {
                const data = await res.json();
                setServices(data.filter(s => s.is_active));
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const categories = [...new Set(services.map(s => s.category))];

    const handleAddToCart = (service) => {
        addItem(service);
        alert(`✅ ${service.name} adicionado ao carrinho!`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-champagne-gold/10">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <Sparkles className="absolute top-10 left-10 w-16 h-16 animate-pulse" />
                    <Sparkles className="absolute bottom-10 right-10 w-20 h-20 animate-pulse" style={{ animationDelay: '1s' }} />
                    <Sparkles className="absolute top-1/2 left-1/3 w-12 h-12 animate-pulse" style={{ animationDelay: '2s' }} />
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold mb-6">
                        ⭐ Agendamento Online 24h
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Transforme Seu Visual com a<br />
                        <span className="text-yellow-300">Aura Beauty</span>
                    </h1>
                    <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                        Serviços premium com profissionais experientes.<br />
                        Agende agora e tenha uma experiência única!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="#servicos"
                            className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all flex items-center justify-center gap-2"
                        >
                            Ver Serviços
                            <ArrowRight size={20} />
                        </Link>
                        <a
                            href="https://wa.me/5516993706612"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all border-2 border-white/30"
                        >
                            WhatsApp: (16) 99370-6612
                        </a>
                    </div>
                </div>
            </section>

            {/* Badges */}
            <section className="py-8 bg-white border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="flex flex-col items-center">
                            <Award size={32} className="text-green-600 mb-2" />
                            <div className="font-bold">Profissionais</div>
                            <div className="text-sm text-gray-500">Certificados</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Star size={32} className="text-yellow-400 mb-2" />
                            <div className="font-bold">5.0 Estrelas</div>
                            <div className="text-sm text-gray-500">Avaliação</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Clock size={32} className="text-blue-600 mb-2" />
                            <div className="font-bold">Pontualidade</div>
                            <div className="text-sm text-gray-500">100%</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <Calendar size={32} className="text-purple-600 mb-2" />
                            <div className="font-bold">Horários</div>
                            <div className="text-sm text-gray-500">Flexíveis</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="servicos" className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4">Nossos Serviços</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Escolha o tratamento perfeito para você. Todos os serviços incluem consultoria personalizada!
                    </p>

                    {categories.map(category => {
                        const categoryServices = services.filter(s => s.category === category);

                        return (
                            <div key={category} className="mb-12">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                    <Sparkles size={24} className="text-green-600" />
                                    {category}
                                </h3>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryServices.map(service => (
                                        <div
                                            key={service.id}
                                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group"
                                        >
                                            <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 text-white">
                                                <h4 className="text-xl font-bold mb-2">{service.name}</h4>
                                                <p className="text-sm text-green-100">{service.description || 'Serviço premium'}</p>
                                            </div>

                                            <div className="p-6">
                                                <div className="flex justify-between items-end mb-6">
                                                    <div>
                                                        <div className="text-3xl font-bold text-green-600">
                                                            R$ {service.price.toFixed(2)}
                                                        </div>
                                                        <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                                            <Clock size={14} />
                                                            {service.duration} minutos
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <button
                                                        onClick={() => handleAddToCart(service)}
                                                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all"
                                                    >
                                                        Adicionar ao Carrinho
                                                    </button>
                                                    <Link
                                                        href="/booking"
                                                        className="block w-full border-2 border-green-600 text-green-600 py-3 rounded-lg font-bold hover:bg-green-50 transition-all text-center"
                                                    >
                                                        Agendar Agora
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Pronta Para Se Transformar?
                    </h2>
                    <p className="text-xl mb-8 text-green-100">
                        Agende seu horário agora e venha viver uma experiência única!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/checkout"
                            className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all"
                        >
                            Finalizar Agendamento
                        </Link>
                        <Link
                            href="#servicos"
                            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all border-2 border-white/30"
                        >
                            Ver Mais Serviços
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
