'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-stone-900 font-serif">
                            AURA <span className="text-stone-400 font-light">BEAUTY</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-stone-600 hover:text-stone-900 transition-colors text-sm uppercase tracking-widest">
                            Home
                        </Link>
                        <Link href="/#services" className="text-stone-600 hover:text-stone-900 transition-colors text-sm uppercase tracking-widest">
                            Menu de Beleza
                        </Link>
                        <Link href="/booking" className="btn-primary">
                            Agendar
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-stone-600 hover:text-stone-900 focus:outline-none"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-stone-100 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col items-center">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-stone-800 text-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/#services"
                            className="block px-3 py-2 text-stone-800 text-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Menu de Beleza
                        </Link>
                        <Link
                            href="/booking"
                            className="block px-3 py-2 mt-4 btn-primary w-full text-center"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Agendar Horário
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
