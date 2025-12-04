'use client';

import { useState, useEffect } from 'react';
import { Scissors, Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function AdminServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Cabelo',
        price: '',
        duration: '',
        description: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Erro ao buscar serviços:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingService ? 'PUT' : 'POST';
        const url = editingService ? `/api/services/${editingService.id}` : '/api/services';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                fetchServices();
                closeModal();
            } else {
                alert('Erro ao salvar serviço');
            }
        } catch (error) {
            console.error('Erro ao salvar:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este serviço?')) return;

        try {
            const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setServices(services.filter(s => s.id !== id));
            } else {
                alert('Erro ao excluir serviço');
            }
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    };

    const openModal = (service = null) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                category: service.category,
                price: service.price,
                duration: service.duration,
                description: service.description || '',
            });
        } else {
            setEditingService(null);
            setFormData({
                name: '',
                category: 'Cabelo',
                price: '',
                duration: '',
                description: '',
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="font-primary text-3xl text-black-elegant">Serviços</h1>
                    <p className="text-gray-soft">Gerencie o menu de serviços do salão.</p>
                </div>

                <button onClick={() => openModal()} className="btn-primary flex items-center gap-2">
                    <Plus size={18} />
                    <span>Novo Serviço</span>
                </button>
            </div>

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p className="text-gray-500">Carregando...</p>
                ) : services.map((service) => (
                    <div key={service.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-full bg-champagne-gold bg-opacity-10 text-champagne-gold">
                                <Scissors size={24} />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openModal(service)} className="p-2 text-gray-400 hover:text-black-elegant">
                                    <Edit2 size={18} />
                                </button>
                                <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-400 hover:text-red-500">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-primary text-xl text-black-elegant mb-2">{service.name}</h3>
                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                            <span className="font-bold text-black-elegant">R$ {service.price.toFixed(2)}</span>
                            <span className="text-xs text-gray-400">{service.duration} min</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-primary text-2xl text-black-elegant">
                                {editingService ? 'Editar Serviço' : 'Novo Serviço'}
                            </h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-black-elegant">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">Nome do Serviço</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">Preço (R$)</label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">Duração (min)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                        value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">Categoria</label>
                                <select
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Cabelo</option>
                                    <option>Coloração</option>
                                    <option>Tratamento</option>
                                    <option>Styling</option>
                                    <option>Outros</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">Descrição</label>
                                <textarea
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-champagne-gold h-24 resize-none"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-bold"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-black-elegant text-white rounded-lg hover:bg-champagne-gold hover:text-black-elegant transition-colors font-bold"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
