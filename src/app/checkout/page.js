'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store';
import { ShoppingCart, CreditCard, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotal, clearCart } = useCartStore();
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        date: '',
        time: '',
        paymentMethod: 'mercadopago',
        notes: ''
    });
    const [loading, setLoading] = useState(false);

    const total = getTotal();

    useEffect(() => {
        if (items.length === 0) {
            router.push('/booking');
        }
    }, [items, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create booking for each service
            for (const item of items) {
                for (let i = 0; i < item.quantity; i++) {
                    const bookingData = {
                        client_name: formData.name,
                        whatsapp: formData.whatsapp,
                        email: formData.email,
                        service_id: item.id,
                        date: formData.date,
                        time: formData.time,
                        notes: formData.notes
                    };

                    const res = await fetch('/api/appointments', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bookingData)
                    });

                    if (!res.ok) throw new Error('Erro ao criar agendamento');
                }
            }

            // Clear cart and redirect to success
            clearCart();
            router.push('/checkout/success');

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Erro ao finalizar pedido. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                    <ShoppingCart size={32} className="text-green-600" />
                    Finalizar Agendamento
                </h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Form */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Seus Dados</h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Nome Completo *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            placeholder="Seu nome"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                name="whatsapp"
                                                required
                                                value={formData.whatsapp}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                                placeholder="(00) 00000-0000"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                E-mail
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                                placeholder="seu@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Data *
                                            </label>
                                            <input
                                                type="date"
                                                name="date"
                                                required
                                                value={formData.date}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Horário *
                                            </label>
                                            <select
                                                name="time"
                                                required
                                                value={formData.time}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            >
                                                <option value="">Selecione</option>
                                                <option value="09:00">09:00</option>
                                                <option value="10:00">10:00</option>
                                                <option value="11:00">11:00</option>
                                                <option value="14:00">14:00</option>
                                                <option value="15:00">15:00</option>
                                                <option value="16:00">16:00</option>
                                                <option value="17:00">17:00</option>
                                                <option value="18:00">18:00</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Observações
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            placeholder="Alguma observação especial?"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? 'Processando...' : 'Confirmar Agendamento'}
                                <Check size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Summary */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
                            <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>

                            <div className="space-y-3 mb-6">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.name} x{item.quantity}
                                        </span>
                                        <span className="font-bold">
                                            R$ {(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-green-600">R$ {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-800">
                                <p className="font-bold mb-1">✓ Pagamento no local</p>
                                <p className="text-xs">Você pode pagar diretamente no salão após realizar o serviço.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
