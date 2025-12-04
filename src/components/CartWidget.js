'use client';

import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store';
import { useState } from 'react';
import Link from 'next/link';

export default function CartWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, removeItem, updateQuantity, getTotal, getItemCount, clearCart } = useCartStore();

    const itemCount = getItemCount();
    const total = getTotal();

    return (
        <>
            {/* Cart Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2"
            >
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {itemCount}
                    </span>
                )}
            </button>

            {/* Cart Drawer */}
            {isOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white z-50 shadow-2xl flex flex-col">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-green-600 text-white">
                            <div>
                                <h2 className="font-bold text-xl">Carrinho</h2>
                                <p className="text-sm opacity-90">{itemCount} {itemCount === 1 ? 'item' : 'itens'}</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 p-2 rounded-full">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center py-12 text-gray-500">
                                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                                    <p>Seu carrinho está vazio</p>
                                    <Link
                                        href="/booking"
                                        onClick={() => setIsOpen(false)}
                                        className="inline-block mt-4 text-green-600 hover:text-green-700 font-bold"
                                    >
                                        Ver Serviços
                                    </Link>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{item.category}</p>
                                                <p className="text-xs text-gray-400 mt-1">{item.duration} min</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="bg-white rounded-full p-1 hover:bg-gray-200 transition-colors"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-3 font-bold">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="bg-white rounded-full p-1 hover:bg-gray-200 transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-lg text-gray-900">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </p>
                                                {item.quantity > 1 && (
                                                    <p className="text-xs text-gray-500">
                                                        R$ {item.price.toFixed(2)} cada
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-gray-200 p-6 bg-gray-50 space-y-4">
                                <div className="flex justify-between items-center text-lg">
                                    <span className="font-bold text-gray-700">Total:</span>
                                    <span className="font-bold text-2xl text-green-600">
                                        R$ {total.toFixed(2)}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    <Link
                                        href="/checkout"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Finalizar Pedido
                                        <ShoppingCart size={18} />
                                    </Link>

                                    <button
                                        onClick={() => {
                                            if (confirm('Deseja realmente limpar o carrinho?')) {
                                                clearCart();
                                            }
                                        }}
                                        className="w-full border border-red-300 text-red-600 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors"
                                    >
                                        Limpar Carrinho
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}
