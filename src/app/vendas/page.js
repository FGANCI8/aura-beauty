import Link from 'next/link';
import { Check, Zap, TrendingUp, Clock, Shield, Smartphone, Calendar, DollarSign, Users, ArrowRight, Star } from 'lucide-react';

export default function VendasPage() {
    const benefits = [
        {
            icon: Calendar,
            title: 'Agendamento 24/7',
            description: 'Seus clientes agendam a qualquer hora, de qualquer lugar. Nunca mais perca um cliente fora do horário comercial.'
        },
        {
            icon: DollarSign,
            title: '+40% em Faturamento',
            description: 'Salões que usam Renova Aura aumentam em média 40% nos agendamentos no primeiro mês.'
        },
        {
            icon: Clock,
            title: 'Economize 10h/semana',
            description: 'Automatize atendimento, confirmações e lembretes. Foque no que realmente importa: seus clientes.'
        },
        {
            icon: Smartphone,
            title: 'App Completo',
            description: 'Site premium + painel administrativo + app mobile. Tudo integrado e funcionando perfeitamente.'
        },
        {
            icon: Shield,
            title: '100% Seguro',
            description: 'Pagamentos via Mercado Pago, dados criptografados, backup automático. Zero preocupação.'
        },
        {
            icon: TrendingUp,
            title: 'Análises Inteligentes',
            description: 'Dashboards com insights sobre seus melhores clientes, horários mais procurados e serviços campeões.'
        }
    ];

    const features = [
        'Agendamento Online Automático',
        'WhatsApp Business Integrado',
        'Pagamento Online (Mercado Pago)',
        'Confirmações Automáticas',
        'Lembretes por SMS/WhatsApp',
        'Gestão de Clientes',
        'Gestão de Serviços',
        'Relatórios e Estatísticas',
        'Design Luxuoso Premium',
        'Suporte Dedicado'
    ];

    const testimonials = [
        {
            name: 'Mariana Silva',
            salon: 'Bella Estética',
            text: 'Em 2 meses, meus agendamentos triplicaram! O sistema é incrível e meus clientes adoram a praticidade.',
            rating: 5
        },
        {
            name: 'Roberto Costa',
            salon: 'Studio Premium',
            text: 'Economizei 15 horas por semana que gastava organizando agenda. Agora foco só nos atendimentos!',
            rating: 5
        },
        {
            name: 'Ana Paula',
            salon: 'Glamour Hair',
            text: 'O melhor investimento que fiz! Profissional, elegante e funciona perfeitamente. Recomendo!',
            rating: 5
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
                    }}></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
                            ⚡ Automação Completa para Salões de Beleza
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Triplique Seus<br />
                            Agendamentos com<br />
                            <span className="text-yellow-300">Renova Aura</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
                            O sistema de gestão que transforma seu salão em uma máquina de agendamentos.
                            <strong className="block mt-2 text-white">Simples, rápido e com ROI comprovado.</strong>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                href="#contato"
                                className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition-all shadow-2xl hover:scale-105 flex items-center gap-2"
                            >
                                🚀 Quero Implantar Agora
                                <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="#beneficios"
                                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
                            >
                                Ver Demonstração
                            </Link>
                        </div>

                        <p className="mt-6 text-green-200 text-sm">
                            ✓ Sem taxa de instalação  ✓ Suporte gratuito  ✓ Treinamento incluso
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">+200</div>
                            <div className="text-gray-600">Salões Ativos</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">40%</div>
                            <div className="text-gray-600">Aumento Médio</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">10h</div>
                            <div className="text-gray-600">Economizadas/Semana</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-green-600 mb-2">4.9★</div>
                            <div className="text-gray-600">Avaliação Média</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section id="beneficios" className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4">Por Que Renova Aura?</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Não é só um sistema. É um parceiro de crescimento para o seu salão.
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon;
                            return (
                                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100">
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <Icon size={28} className="text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                    <p className="text-gray-600">{benefit.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features List */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Tudo Que Seu Salão Precisa em Um Só Lugar</h2>
                            <p className="text-gray-600 mb-8 text-lg">
                                Sistema completo de gestão com todas as ferramentas essenciais para automatizar e profissionalizar seu negócio.
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                                {features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check size={16} className="text-green-600" />
                                        </div>
                                        <span className="font-medium text-gray-800">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-green-800 p-8 rounded-2xl text-white">
                            <div className="text-5xl font-bold mb-4">R$ 297</div>
                            <div className="text-xl mb-6">por mês</div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-2">
                                    <Check size={20} />
                                    <span>Instalação gratuita</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={20} />
                                    <span>Treinamento completo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={20} />
                                    <span>Suporte ilimitado</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={20} />
                                    <span>Atualizações gratuitas</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check size={20} />
                                    <span>Sem fidelidade</span>
                                </div>
                            </div>

                            <Link
                                href="#contato"
                                className="block w-full bg-yellow-400 text-green-900 py-4 rounded-lg font-bold text-center hover:bg-yellow-300 transition-all"
                            >
                                Começar Agora →
                            </Link>

                            <p className="text-center mt-4 text-green-200 text-sm">
                                💳 Aceeitamos cartão, PIX e boleto
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-4">O Que Nossos Clientes Dizem</h2>
                    <p className="text-center text-gray-600 mb-12">
                        Histórias reais de transformação
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-700 mb-4 italic">&quot;{testimonial.text}&quot;</p>
                                <div className="border-t pt-4">
                                    <div className="font-bold">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.salon}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section id="contato" className="py-20 bg-gradient-to-br from-green-600 to-green-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Pronto Para Transformar Seu Salão?
                    </h2>
                    <p className="text-xl mb-8 text-green-100">
                        Entre em contato agora e receba uma demonstração exclusiva!
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl max-w-md mx-auto">
                        <div className="space-y-4">
                            <a
                                href="https://wa.me/5516993706612?text=Olá!%20Quero%20conhecer%20o%20Renova%20Aura"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full bg-yellow-400 text-green-900 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-all flex items-center justify-center gap-2"
                            >
                                <Smartphone size={20} />
                                Falar no WhatsApp
                            </a>

                            <Link
                                href="/admin/login"
                                className="block w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-lg font-bold hover:bg-white/30 transition-all border-2 border-white/30"
                            >
                                Acessar Demonstração
                            </Link>
                        </div>

                        <p className="mt-6 text-sm text-green-200">
                            📞 (16) 99370-6612 | 📧 contato@renovaaura.com.br
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
