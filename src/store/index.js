import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Cart Store
export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addItem: (service) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === service.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === service.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    });
                } else {
                    set({ items: [...items, { ...service, quantity: 1 }] });
                }
            },

            removeItem: (serviceId) => {
                set({ items: get().items.filter(item => item.id !== serviceId) });
            },

            updateQuantity: (serviceId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(serviceId);
                } else {
                    set({
                        items: get().items.map(item =>
                            item.id === serviceId ? { ...item, quantity } : item
                        )
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'aura-cart-storage',
        }
    )
);

// Chat Store
export const useChatStore = create((set, get) => ({
    messages: [
        {
            id: 1,
            type: 'agent',
            text: 'Olá! 👋 Sou a Aura, sua assistente inteligente. Como posso ajudar você hoje?',
            mode: 'neutral',
            timestamp: new Date()
        }
    ],
    isOpen: false,
    loading: false,

    addMessage: (message) => {
        set({ messages: [...get().messages, { ...message, id: Date.now(), timestamp: new Date() }] });
    },

    setLoading: (loading) => set({ loading }),

    toggleChat: () => set({ isOpen: !get().isOpen }),

    openChat: () => set({ isOpen: true }),

    closeChat: () => set({ isOpen: false }),

    clearMessages: () => set({
        messages: [
            {
                id: 1,
                type: 'agent',
                text: 'Olá! 👋 Sou a Aura, sua assistente inteligente. Como posso ajudar você hoje?',
                mode: 'neutral',
                timestamp: new Date()
            }
        ]
    })
}));

// User/Auth Store (para futuro)
export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAdmin: false,

            setUser: (user) => set({ user, isAdmin: user?.role === 'admin' }),

            logout: () => set({ user: null, isAdmin: false })
        }),
        {
            name: 'aura-auth-storage',
        }
    )
);

// Settings Store
export const useSettingsStore = create(
    persist(
        (set) => ({
            salonName: 'Aura Beauty',
            whatsapp: '5516993706612',
            theme: 'light',

            updateSettings: (settings) => set(settings)
        }),
        {
            name: 'aura-settings-storage',
        }
    )
);
