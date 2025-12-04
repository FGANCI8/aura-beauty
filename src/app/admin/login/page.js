'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Falha no login');
            }
        } catch (err) {
            setError('Ocorreu um erro. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white-ice relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-champagne-gold opacity-10 blur-[100px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-nude-rose opacity-10 blur-[100px]"></div>

            <div className="w-full max-w-md p-8 z-10">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-10 border border-white/50">
                    <div className="text-center mb-10">
                        <h1 className="font-primary text-4xl text-black-elegant mb-2">Aura Beauty</h1>
                        <p className="text-gray-soft text-sm tracking-widest uppercase">Acesso Administrativo</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-xs font-bold text-gray-soft uppercase tracking-wider mb-2">
                                Senha de Acesso
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-gray-200 py-3 text-black-elegant focus:outline-none focus:border-champagne-gold transition-colors font-secondary"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black-elegant text-white py-4 rounded-none hover:bg-champagne-gold hover:text-black-elegant transition-all duration-300 uppercase tracking-widest text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Entrando...' : 'Acessar Painel'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            &copy; {new Date().getFullYear()} Aura Beauty Premium
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
