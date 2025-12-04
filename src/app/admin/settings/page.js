'use client';

import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Lock, DollarSign, Clock, Phone, Building2 } from 'lucide-react';

export default function AdminSettings() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        salon_name: '',
        whatsapp_oficial: '',
        operating_hours_start: '',
        operating_hours_end: '',
        cancellation_min_hours: '',
        mercado_pago_public_key: '',
        mercado_pago_access_token: '',
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setFormData(prev => ({
                    ...prev,
                    ...data
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar configurações:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert('Configurações salvas com sucesso!');
            } else {
                alert('Erro ao salvar configurações');
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar configurações');
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Carregando configurações...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-primary text-3xl text-black-elegant">Configurações</h1>
                <p className="text-gray-soft">Gerencie as configurações globais do salão.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Salon Information */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-champagne-gold bg-opacity-10 text-champagne-gold">
                            <Building2 size={24} />
                        </div>
                        <h2 className="font-primary text-xl text-black-elegant">Informações do Salão</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                Nome do Salão
                            </label>
                            <input
                                type="text"
                                name="salon_name"
                                value={formData.salon_name}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                <Phone size={14} className="inline mr-1" />
                                WhatsApp Oficial
                            </label>
                            <input
                                type="tel"
                                name="whatsapp_oficial"
                                value={formData.whatsapp_oficial}
                                onChange={handleChange}
                                placeholder="5516999999999"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-blue-500 bg-opacity-10 text-blue-500">
                            <Clock size={24} />
                        </div>
                        <h2 className="font-primary text-xl text-black-elegant">Horário de Funcionamento</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                Abertura
                            </label>
                            <input
                                type="time"
                                name="operating_hours_start"
                                value={formData.operating_hours_start}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                Fechamento
                            </label>
                            <input
                                type="time"
                                name="operating_hours_end"
                                value={formData.operating_hours_end}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                Mín. Horas p/ Cancelar
                            </label>
                            <input
                                type="number"
                                name="cancellation_min_hours"
                                value={formData.cancellation_min_hours}
                                onChange={handleChange}
                                min="0"
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Mercado Pago */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 rounded-full bg-green-500 bg-opacity-10 text-green-500">
                            <DollarSign size={24} />
                        </div>
                        <h2 className="font-primary text-xl text-black-elegant">Mercado Pago</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                            <p className="text-yellow-800">
                                <strong>⚠️ Importante:</strong> As credenciais do Mercado Pago devem ser armazenadas em variáveis de ambiente (.env.local) por segurança.
                                Use este formulário apenas para referência ou testes em ambiente de desenvolvimento.
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                <Lock size={14} className="inline mr-1" />
                                Public Key
                            </label>
                            <input
                                type="text"
                                name="mercado_pago_public_key"
                                value={formData.mercado_pago_public_key}
                                onChange={handleChange}
                                placeholder="APP_USR-..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                <Lock size={14} className="inline mr-1" />
                                Access Token
                            </label>
                            <input
                                type="password"
                                name="mercado_pago_access_token"
                                value={formData.mercado_pago_access_token}
                                onChange={handleChange}
                                placeholder="APP_USR-..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold font-mono text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 bg-black-elegant text-white rounded-lg hover:bg-champagne-gold hover:text-black-elegant transition-colors font-bold disabled:opacity-50"
                    >
                        <Save size={18} />
                        <span>{saving ? 'Salvando...' : 'Salvar Configurações'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
