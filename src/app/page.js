import Link from 'next/link';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';
import db from '@/lib/db';

async function getServices() {
    const services = db.prepare('SELECT * FROM services WHERE is_active = 1 LIMIT 4').all();
    return services;
}

export default async function Home() {
    const services = await getServices();

    return (
        <div className="flex flex-col min-h-screen bg-white-ice">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black-elegant/40 z-10" />
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center scale-105 animate-pulse-slow" />
                </div>

                <div className="relative z-20 text-center px-4 max-w-5xl mx-auto text-white-ice">
                    <span className="text-champagne-gold uppercase tracking-[0.3em] text-sm font-medium mb-6 block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        Renova Aura
                    </span>
                    <h1 className="text-6xl md:text-8xl font-primary mb-8 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                        Beleza arquitetada.<br />Luxo silencioso.
                    </h1>
                    <p className="text-gray-200 text-lg md:text-2xl mb-12 max-w-2xl mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        Cortes precisos, coloração sofisticada e experiências sensoriais exclusivas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
                        <Link href="/booking" className="bg-champagne-gold text-black-elegant px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors duration-300">
                            Agendar Agora
                        </Link>
                        <Link href="#services" className="border border-white-ice text-white-ice px-8 py-4 uppercase tracking-widest text-sm font-bold hover:bg-white-ice hover:text-black-elegant transition-colors duration-300">
                            Ver Menu
                        </Link>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="py-24 bg-white-ice">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        <div className="p-8">
                            <div className="flex justify-center mb-6 text-champagne-gold">
                                <Users size={40} strokeWidth={1} />
                            </div>
                            <h3 className="text-5xl font-primary text-black-elegant mb-2">+1200</h3>
                            <p className="text-gray-soft uppercase tracking-widest text-xs">Clientes Transformadas</p>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-center mb-6 text-champagne-gold">
                                <Star size={40} strokeWidth={1} />
                            </div>
                            <h3 className="text-5xl font-primary text-black-elegant mb-2">5.0</h3>
                            <p className="text-gray-soft uppercase tracking-widest text-xs">Avaliação Média</p>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-center mb-6 text-champagne-gold">
                                <Clock size={40} strokeWidth={1} />
                            </div>
                            <h3 className="text-5xl font-primary text-black-elegant mb-2">100%</h3>
                            <p className="text-gray-soft uppercase tracking-widest text-xs">Pontualidade</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Preview */}
            <section id="services" className="py-32 bg-nude-rose/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-primary text-black-elegant mb-6">Menu de Beleza</h2>
                        <p className="text-gray-soft font-light text-lg">Uma seleção dos nossos procedimentos mais exclusivos.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <div key={service.id} className="bg-white p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="text-xs font-bold text-champagne-gold uppercase tracking-wider mb-4">{service.category}</div>
                                <h3 className="text-2xl font-primary text-black-elegant mb-4 group-hover:text-champagne-gold transition-colors">{service.name}</h3>
                                <div className="flex justify-between items-end mt-8 pt-8 border-t border-gray-100">
                                    <span className="text-xl font-medium text-black-elegant">R$ {service.price}</span>
                                    <span className="text-gray-400 text-sm">{service.duration} min</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link href="/booking" className="inline-flex items-center text-black-elegant hover:text-champagne-gold transition-colors uppercase tracking-widest text-sm font-bold border-b border-black-elegant hover:border-champagne-gold pb-1">
                            Ver todos os serviços <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Aura Presentation */}
            <section className="py-32 bg-black-elegant text-white-ice overflow-hidden relative">
                <div className="absolute top-0 right-0 -mt-40 -mr-40 w-[600px] h-[600px] bg-champagne-gold rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-0 left-0 -mb-40 -ml-40 w-[600px] h-[600px] bg-nude-rose rounded-full blur-[150px] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-20">
                        <div className="w-full md:w-1/2">
                            <div className="aspect-[3/4] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                                <img
                                    src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2069&auto=format&fit=crop"
                                    alt="Aura Assistant"
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 border border-white/10 m-4"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <span className="text-champagne-gold uppercase tracking-[0.2em] text-sm font-medium mb-6 block">
                                Inteligência Artificial
                            </span>
                            <h2 className="text-5xl md:text-6xl font-primary mb-8 leading-tight">
                                Conheça a <span className="italic text-champagne-gold">Aura</span>
                            </h2>
                            <p className="text-gray-400 text-xl mb-10 leading-relaxed font-light">
                                "Sou a Aura, sua assistente exclusiva. Estou aqui para garantir que sua experiência comece antes mesmo de você chegar ao salão, com agendamento instantâneo e atendimento personalizado."
                            </p>
                            <ul className="space-y-6 text-gray-300 mb-12 text-left max-w-md mx-auto md:mx-0">
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full mr-4"></span>
                                    <span className="tracking-wide">Agendamento 24/7 via WhatsApp</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full mr-4"></span>
                                    <span className="tracking-wide">Lembretes inteligentes</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full mr-4"></span>
                                    <span className="tracking-wide">Atendimento humanizado</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
