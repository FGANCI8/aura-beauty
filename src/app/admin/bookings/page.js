'use client';

import { useState, useEffect } from 'react';
import { Calendar, Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('todos');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            if (res.ok) {
                const data = await res.json();
                setBookings(data);
            }
        } catch (error) {
            console.error('Erro ao buscar agendamentos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await fetch(`/api/bookings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                // Update local state
                setBookings(bookings.map(b =>
                    b.id === id ? { ...b, status: newStatus } : b
                ));
            } else {
                alert('Erro ao atualizar status');
            }
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            alert('Erro ao atualizar status');
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesFilter = filter === 'todos' || booking.status === filter;
        const matchesSearch = booking.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.service_name?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmado': return 'bg-green-100 text-green-800';
            case 'pendente': return 'bg-yellow-100 text-yellow-800';
            case 'cancelado': return 'bg-red-100 text-red-800';
            case 'concluido': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-primary text-3xl text-black-elegant">Agendamentos</h1>
                    <p className="text-gray-soft">Gerencie todos os horários marcados.</p>
                </div>

                <div className="flex gap-2">
                    <button className="btn-primary flex items-center gap-2">
                        <Calendar size={18} />
                        <span>Novo Agendamento</span>
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente ou serviço..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-champagne-gold transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    {['todos', 'novo', 'confirmado', 'concluido', 'cancelado'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize whitespace-nowrap transition-colors ${filter === status
                                    ? 'bg-black-elegant text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Carregando agendamentos...</div>
                ) : filteredBookings.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Nenhum agendamento encontrado.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Serviço</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Data & Hora</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Valor</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-black-elegant">{booking.client_name}</div>
                                            <div className="text-xs text-gray-400">{booking.whatsapp}</div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{booking.service_name || 'Serviço Removido'}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                <span>{booking.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                <Clock size={12} />
                                                <span>{booking.time}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-black-elegant">
                                            R$ {booking.price?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {booking.status === 'novo' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'confirmado')}
                                                            className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                                            title="Aprovar"
                                                        >
                                                            <CheckCircle size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'cancelado')}
                                                            className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                                            title="Cancelar"
                                                        >
                                                            <XCircle size={18} />
                                                        </button>
                                                    </>
                                                )}
                                                {booking.status === 'confirmado' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'concluido')}
                                                        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                        title="Concluir"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
