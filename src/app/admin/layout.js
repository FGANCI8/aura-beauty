'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Calendar, Scissors, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    // If we are on the login page, don't show the sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Agendamentos', href: '/admin/bookings', icon: Calendar },
        { name: 'Serviços', href: '/admin/services', icon: Scissors },
        { name: 'Clientes', href: '/admin/clients', icon: Users },
        { name: 'Configurações', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-white-ice">
            {/* Sidebar */}
            <aside className="w-64 bg-black-elegant text-white fixed h-full z-20 hidden md:block">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="font-primary text-2xl text-champagne-gold">Aura Admin</h2>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                        ? 'bg-champagne-gold text-black-elegant font-bold'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
                    <button
                        className="flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 w-full transition-colors"
                        onClick={async () => {
                            await fetch('/api/auth/logout', { method: 'POST' });
                            window.location.href = '/admin/login';
                        }}
                    >
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
