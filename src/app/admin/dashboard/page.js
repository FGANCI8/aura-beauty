'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Users, Calendar, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
    // Mock data for now - will be replaced by real API calls later
    const stats = [
        { title: 'Agendamentos Hoje', value: '12', icon: Calendar, change: '+20%', color: 'bg-blue-500' },
        { title: 'Novos Clientes', value: '5', icon: Users, change: '+15%', color: 'bg-green-500' },
        { title: 'Faturamento (Mês)', value: 'R$ 15.420', icon: DollarSign, change: '+8%', color: 'bg-champagne-gold' },
        { title: 'Taxa de Ocupação', value: '85%', icon: TrendingUp, change: '+2%', color: 'bg-purple-500' },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-primary text-3xl text-black-elegant">Dashboard</h1>
                <p className="text-gray-soft">Bem-vindo ao painel administrativo do Aura Beauty.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-black-elegant mt-2">{stat.value}</h3>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                                    <Icon size={24} className={`text-${stat.color.replace('bg-', '')}`} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <span className="text-green-500 font-bold">{stat.change}</span>
                                <span className="text-gray-400 ml-2">vs. mês anterior</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Bookings Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-primary text-xl text-black-elegant mb-6">Agendamentos Recentes</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Serviço</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Data/Hora</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i} className="group hover:bg-gray-50 transition-colors">
                                    <td className="py-4">
                                        <div className="font-bold text-black-elegant">Ana Souza</div>
                                        <div className="text-xs text-gray-400">ana@example.com</div>
                                    </td>
                                    <td className="py-4 text-gray-600">Corte Arquitetado</td>
                                    <td className="py-4 text-gray-600">
                                        <div>03 Dez, 2025</div>
                                        <div className="text-xs">14:00</div>
                                    </td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800">
                                            Pendente
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <button className="text-sm text-black-elegant hover:text-champagne-gold font-bold underline">
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
