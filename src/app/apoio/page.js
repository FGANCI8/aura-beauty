'use client';

import { useState } from 'react';
import { HelpCircle, Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Book, Video, FileText } from 'lucide-react';
import Link from 'next/link';

export default function ApoioPage() {
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            question: 'Como faço para agendar um horário?',
            answer: 'É super fácil! Você pode agendar de 3 formas: 1) Pelo nosso site na página "/booking", 2) Pelo WhatsApp (16) 99370-6612, ou 3) Falando com nossa IA Aura diretamente no chat. O agendamento está disponível 24 horas por dia!'
        },
        {
            question: 'Como faço para cancelar ou reagendar?',
            answer: 'Você pode cancelar ou reagendar com até 2 horas de antecedência. Basta entrar em contato pelo WhatsApp ou acessar a área de "Meus Agendamentos" no site. Cancelamentos muito próximos do horário podem não ser possíveis.'
        },
        {
            question: 'Quais formas de pagamento vocês aceitam?',
            answer: 'Aceitamos todas as formas! Cartão de crédito/débito, PIX, dinheiro e também pagamento online via Mercado Pago. Você pode pagar no salão após o atendimento ou pagar online ao fazer o agendamento.'
        },
        {
            question: 'Posso agendar mais de um serviço ao mesmo tempo?',
            answer: 'Sim! Use o carrinho de compras do site para adicionar múltiplos serviços e agendar todos de uma vez. Nosso sistema calcula automaticamente o tempo total necessário.'
        },
        {
            question: 'Como funciona o sistema Renova Aura?',
            answer: 'O Renova Aura é nosso sistema inteligente de automação. Ele gerencia agendamentos, envia lembretes automáticos, permite pagamento online e muito mais. Tudo para tornar sua experiência mais prática e moderna!'
        },
        {
            question: 'Vocês atendem em domicílio?',
            answer: 'Atualmente atendemos apenas no salão, onde temos toda a estrutura premium para te receber. Mas fique atento! Em breve poderemos ter essa opção.'
        },
        {
            question: 'Preciso levar alguma coisa para o atendimento?',
            answer: 'Não precisa levar nada! Fornecemos todos os produtos profissionais e itens necessários. Só venha pronta para relaxar e se transformar! 💆‍♀️✨'
        },
        {
            question: 'Como funciona a garantia dos serviços?',
            answer: 'Temos 100% de satisfação garantida! Se você não ficar satisfeita com o resultado, refazemos o serviço gratuitamente ou devolvemos seu dinheiro. Sua felicidade é nossa prioridade!'
        }
    ];

    const tutorials = [
        {
            icon: Book,
            title: 'Guia de Agendamento',
            description: 'Aprenda passo a passo como fazer seu primeiro agendamento',
            link: '#tutorial-agendamento'
        },
        {
            icon: Video,
            title: 'Vídeo Tutorial',
            description: 'Assista nosso vídeo rápido de 3 minutos',
            link: '#video'
        },
        {
            icon: FileText,
            title: 'Manual Completo',
            description: 'Documentação completa de todas as funcionalidades',
            link: '#manual'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero */}
            <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <HelpCircle size={40} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Central de Ajuda
                    </h1>
                    <p className="text-xl text-green-100">
                        Estamos aqui para te ajudar! Encontre respostas rápidas ou fale conosco diretamente.
                    </p>
                </div>
            </section>

            {/* Quick Contact */}
            <section className="py-12 bg-white border-b border-gray-200">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        <a
                            href="https://wa.me/5516993706612"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all border-2 border-green-200"
                        >
                            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <MessageCircle size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-green-900">WhatsApp</div>
                                <div className="text-sm text-green-700">(16) 99370-6612</div>
                            </div>
                        </a>

                        <a
                            href="tel:+5516993706612"
                            className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all border-2 border-blue-200"
                        >
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Phone size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-blue-900">Telefone</div>
                                <div className="text-sm text-blue-700">(16) 99370-6612</div>
                            </div>
                        </a>

                        <a
                            href="mailto:contato@renovaaura.com.br"
                            className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all border-2 border-purple-200"
                        >
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Mail size={24} className="text-white" />
                            </div>
                            <div>
                                <div className="font-bold text-purple-900">E-mail</div>
                                <div className="text-sm text-purple-700">contato@renovaaura.com.br</div>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Perguntas Frequentes</h2>
                    <p className="text-center text-gray-600 mb-12">
                        As dúvidas mais comuns dos nossos clientes
                    </p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-bold text-gray-900">{faq.question}</span>
                                    {openFaq === index ? (
                                        <ChevronUp size={20} className="text-green-600 flex-shrink-0 ml-4" />
                                    ) : (
                                        <ChevronDown size={20} className="text-gray-400 flex-shrink-0 ml-4" />
                                    )}
                                </button>

                                {openFaq === index && (
                                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tutorials */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Tutoriais e Guias</h2>
                    <p className="text-center text-gray-600 mb-12">
                        Aprenda a usar todas as funcionalidades
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {tutorials.map((tutorial, index) => {
                            const Icon = tutorial.icon;
                            return (
                                <a
                                    key={index}
                                    href={tutorial.link}
                                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-gray-200 hover:border-green-600 hover:shadow-lg transition-all group"
                                >
                                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors">
                                        <Icon size={28} className="text-green-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">{tutorial.title}</h3>
                                    <p className="text-gray-600 text-sm">{tutorial.description}</p>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Still Need Help */}
            <section className="py-16 bg-gradient-to-br from-green-600 to-green-800 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ainda Precisa de Ajuda?
                    </h2>
                    <p className="text-xl mb-8 text-green-100">
                        Nossa equipe está pronta para te atender!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/5516993706612?text=Olá!%20Preciso%20de%20ajuda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-yellow-400 text-green-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-all inline-flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={20} />
                            Falar no WhatsApp
                        </a>
                        <Link
                            href="/"
                            className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all border-2 border-white/30"
                        >
                            Voltar para Home
                        </Link>
                    </div>

                    <p className="mt-8 text-sm text-green-200">
                        Horário de atendimento: Segunda a Sábado, 9h às 19h
                    </p>
                </div>
            </section>
        </div>
    );
}
