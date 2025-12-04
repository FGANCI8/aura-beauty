'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';

export default function BookingPage() {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        client_name: '',
        whatsapp: '',
        email: '',
        service_id: '',
        date: '',
        time: '',
        notes: ''
    });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const [bookedTimes, setBookedTimes] = useState([]);
    const [checkingAvailability, setCheckingAvailability] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (formData.date) {
            checkAvailability(formData.date);
        } else {
            setBookedTimes([]);
        }
    }, [formData.date]);

    async function fetchServices() {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching services:', error);
            setLoading(false);
        }
    }

    async function checkAvailability(date) {
        setCheckingAvailability(true);
        try {
            const res = await fetch(`/api/availability?date=${date}`);
            const data = await res.json();
            setBookedTimes(data.bookedTimes || []);
        } catch (error) {
            console.error('Error checking availability:', error);
        } finally {
            setCheckingAvailability(false);
        }
    }

    function validateForm() {
        const newErrors = {};

        if (!formData.client_name.trim()) {
            newErrors.client_name = 'Nome é obrigatório';
        }

        if (!formData.whatsapp.trim()) {
            newErrors.whatsapp = 'WhatsApp é obrigatório';
        } else if (!/^\d{11}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
            newErrors.whatsapp = 'WhatsApp deve ter 11 dígitos';
        }

        if (!formData.service_id) {
            newErrors.service_id = 'Selecione um serviço';
        }

        if (!formData.date) {
            newErrors.date = 'Data é obrigatória';
        }

        if (!formData.time) {
            newErrors.time = 'Horário é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setSubmitting(true);

        try {
            // Save to database
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Failed to create appointment');

            const appointment = await res.json();

            // Get service name
            const service = services.find(s => s.id === parseInt(formData.service_id));

            // Prepare WhatsApp message
            const whatsappNumber = '5516993706612';
            const message = `Olá, Aura! Novo agendamento:\n\nNome: ${formData.client_name}\nServiço: ${service?.name || 'N/A'}\nData: ${new Date(formData.date).toLocaleDateString('pt-BR')}\nHorário: ${formData.time}\n\nObservações: ${formData.notes || 'Nenhuma'}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Show success
            setSuccess(true);

            // Initiate Payment
            try {
                const paymentRes = await fetch('/api/payments/mercadopago', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookingId: appointment.id })
                });

                const paymentData = await paymentRes.json();

                if (paymentData.init_point) {
                    // Open Payment in new tab
                    window.open(paymentData.init_point, '_blank');
                }
            } catch (paymentError) {
                console.error('Error initiating payment:', paymentError);
                // Continue to WhatsApp even if payment fails
            }

            // Open WhatsApp in 2 seconds
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 2000);

            // Reset form after 5 seconds
            setTimeout(() => {
                setFormData({
                    client_name: '',
                    whatsapp: '',
                    email: '',
                    service_id: '',
                    date: '',
                    time: '',
                    notes: ''
                });
                setSuccess(false);
                setBookedTimes([]);
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Erro ao criar agendamento. Tente novamente.');
        } finally {
            setSubmitting(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    }

    const timeSlots = [
        "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00"
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Sparkles className="w-12 h-12 text-gold mx-auto mb-4 animate-spin" />
                    <p className="text-stone-500">Carregando...</p>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
                <div className="max-w-md w-full text-center bg-white p-12 rounded-lg shadow-xl">
                    <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-serif text-stone-900 mb-4">Agendamento Confirmado!</h2>
                    <p className="text-stone-600 mb-6">
                        Seu agendamento foi registrado com sucesso. Em instantes você será redirecionado para o WhatsApp.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-gold">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span className="text-sm">Abrindo WhatsApp...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-16 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-gold uppercase tracking-widest text-sm font-medium mb-4 block">
                        Agendamento Online
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-4">
                        Reserve seu Horário
                    </h1>
                    <p className="text-stone-500 max-w-xl mx-auto">
                        Preencha o formulário abaixo e garanta sua experiência exclusiva de beleza.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-lg p-8 md:p-12">
                    {/* Name */}
                    <div className="mb-6">
                        <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                            <User className="w-4 h-4 mr-2 text-gold" />
                            Nome Completo *
                        </label>
                        <input
                            type="text"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${errors.client_name ? 'border-red-500' : 'border-stone-200'} rounded-sm focus:outline-none focus:border-stone-400 transition-colors`}
                            placeholder="Digite seu nome completo"
                        />
                        {errors.client_name && <p className="text-red-500 text-sm mt-1">{errors.client_name}</p>}
                    </div>

                    {/* WhatsApp */}
                    <div className="mb-6">
                        <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                            <Phone className="w-4 h-4 mr-2 text-gold" />
                            WhatsApp *
                        </label>
                        <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${errors.whatsapp ? 'border-red-500' : 'border-stone-200'} rounded-sm focus:outline-none focus:border-stone-400 transition-colors`}
                            placeholder="11999999999"
                            maxLength="11"
                        />
                        {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                        <p className="text-stone-400 text-xs mt-1">Somente números (11 dígitos)</p>
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                            <Mail className="w-4 h-4 mr-2 text-gold" />
                            E-mail (Opcional)
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 transition-colors"
                            placeholder="seu@email.com"
                        />
                    </div>

                    {/* Service */}
                    <div className="mb-6">
                        <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                            <Sparkles className="w-4 h-4 mr-2 text-gold" />
                            Serviço Desejado *
                        </label>
                        <select
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border ${errors.service_id ? 'border-red-500' : 'border-stone-200'} rounded-sm focus:outline-none focus:border-stone-400 transition-colors bg-white`}
                        >
                            <option value="">Selecione um serviço</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - R$ {service.price} ({service.duration} min)
                                </option>
                            ))}
                        </select>
                        {errors.service_id && <p className="text-red-500 text-sm mt-1">{errors.service_id}</p>}
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                                <Calendar className="w-4 h-4 mr-2 text-gold" />
                                Data *
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border ${errors.date ? 'border-red-500' : 'border-stone-200'} rounded-sm focus:outline-none focus:border-stone-400 transition-colors`}
                                min={new Date().toISOString().split('T')[0]}
                            />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        </div>

                        <div>
                            <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                                <Clock className="w-4 h-4 mr-2 text-gold" />
                                Horário *
                            </label>
                            <select
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                disabled={!formData.date || checkingAvailability}
                                className={`w-full px-4 py-3 border ${errors.time ? 'border-red-500' : 'border-stone-200'} rounded-sm focus:outline-none focus:border-stone-400 transition-colors bg-white disabled:bg-stone-100 disabled:cursor-not-allowed`}
                            >
                                <option value="">
                                    {checkingAvailability ? 'Verificando...' : 'Selecione'}
                                </option>
                                {timeSlots.map(slot => (
                                    <option
                                        key={slot}
                                        value={slot}
                                        disabled={bookedTimes.includes(slot)}
                                        className={bookedTimes.includes(slot) ? 'text-stone-400 bg-stone-100' : ''}
                                    >
                                        {slot} {bookedTimes.includes(slot) ? '(Indisponível)' : ''}
                                    </option>
                                ))}
                            </select>
                            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="mb-8">
                        <label className="flex items-center text-stone-700 font-medium mb-2 text-sm uppercase tracking-wider">
                            <MessageSquare className="w-4 h-4 mr-2 text-gold" />
                            Observações
                        </label>
                        <textarea
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 border border-stone-200 rounded-sm focus:outline-none focus:border-stone-400 transition-colors resize-none"
                            placeholder="Alguma preferência ou informação adicional?"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {submitting ? (
                            <>
                                <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                                Processando...
                            </>
                        ) : (
                            'Confirmar Agendamento'
                        )}
                    </button>

                    <p className="text-center text-stone-400 text-xs mt-6">
                        Ao confirmar, você será redirecionado para o WhatsApp para finalizar o contato.
                    </p>
                </form>
            </div>
        </div>
    );
}
