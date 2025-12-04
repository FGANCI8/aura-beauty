'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Phone, Calendar, TrendingUp, X } from 'lucide-react';

export default function AdminClients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientHistory, setClientHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(false);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await fetch('/api/clients');
            if (res.ok) {
                const data = await res.json();
                setClients(data);
            }
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClientHistory = async (whatsapp, clientName) => {
        setLoadingHistory(true);
        setSelectedClient({ whatsapp, name: clientName });
        try {
            const res = await fetch(`/api/clients/${encodeURIComponent(whatsapp)}`);
            if (res.ok) {
                const data = await res.json();
                setClientHistory(data);
            }
        } catch (error) {
            console.error('Erro ao buscar histórico:', error);
        } finally {
            setLoadingHistory(false);
        }
    };

    const closeModal = () => {
        setSelectedClient(null);
        setClientHistory([]);
    };

    const filteredClients = clients.filter(client =>
        client.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.whatsapp.includes(searchTerm)
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmado': return 'bg-green-100 text-green-800';
            case 'pendente': case 'novo': return 'bg-yellow-100 text-yellow-800';
            case 'cancelado': return 'bg-red-100 text-red-800';
            case 'concluido': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-primary text-3xl text-black-elegant">Clientes</h1>
                    <p className="text-gray-soft">Gerencie a base de clientes do salão.</p>
                </div>

                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                    <Users size={20} className="text-champagne-gold" />
                    <span className="font-bold text-black-elegant">{clients.length} clientes</span>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou telefone..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-champagne-gold transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Clients List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Carregando clientes...</div>
                ) : filteredClients.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Nenhum cliente encontrado.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Cliente</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Contato</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Total Agendamentos</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Concluídos</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Última Visita</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredClients.map((client, index) => (
                                    <tr key={index} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-black-elegant">{client.client_name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={14} />
                                                <span>{client.whatsapp}</span>
                                            </div>
                                            {client.email && (
                                                <div className="text-xs text-gray-400 mt-1">{client.email}</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-bold text-black-elegant">{client.total_bookings}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-bold text-green-600">{client.completed_bookings}</span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} />
                                                <span className="text-sm">{client.last_visit || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => fetchClientHistory(client.whatsapp, client.client_name)}
                                                className="text-sm font-bold text-champagne-gold hover:text-black-elegant transition-colors"
                                            >
                                                Ver Histórico
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Client History Modal */}
            {selectedClient && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <div>
                                <h2 className="font-primary text-2xl text-black-elegant">Histórico do Cliente</h2>
                                <p className="text-gray-soft">{selectedClient.name}</p>
                            </div>
                            <button onClick={closeModal} className="text-gray-400 hover:text-black-elegant">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {loadingHistory ? (
                                <div className="text-center text-gray-500 py-12">Carregando histórico...</div>
                            ) : clientHistory.length === 0 ? (
                                <div className="text-center text-gray-500 py-12">Nenhum agendamento encontrado.</div>
                            ) : (
                                <div className="space-y-4">
                                    {clientHistory.map((booking) => (
                                        <div key={booking.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-bold text-black-elegant">{booking.service_name || 'Serviço Removido'}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            <span>{booking.date}</span>
                                                        </div>
                                                        <span>{booking.time}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-black-elegant mb-2">
                                                        R$ {booking.price ? booking.price.toFixed(2) : '0.00'}
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                            {booking.notes && (
                                                <div className="mt-3 pt-3 border-t border-gray-50">
                                                    <p className="text-xs text-gray-500"><strong>Observações:</strong> {booking.notes}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
