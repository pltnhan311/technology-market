import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

export interface CartItem {
    productId: string;
    product: Product;
    quantity: number;
    addedAt: string;
}

interface CartState {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (product: Product, quantity: number) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    setCartOpen: (open: boolean) => void;
    getCartTotal: () => number;
    getCartCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            isCartOpen: false,

            addToCart: (product, quantity) => {
                set((state) => {
                    const existingItem = state.cart.find(
                        (item) => item.productId === product.id
                    );

                    if (existingItem) {
                        // Update quantity of existing item
                        const newQuantity = Math.min(
                            existingItem.quantity + quantity,
                            product.stock
                        );
                        return {
                            cart: state.cart.map((item) =>
                                item.productId === product.id
                                    ? { ...item, quantity: newQuantity }
                                    : item
                            ),
                        };
                    }

                    // Add new item
                    return {
                        cart: [
                            ...state.cart,
                            {
                                productId: product.id,
                                product,
                                quantity: Math.min(quantity, product.stock),
                                addedAt: new Date().toISOString(),
                            },
                        ],
                    };
                });
            },

            updateQuantity: (productId, quantity) => {
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.productId === productId
                            ? {
                                ...item,
                                quantity: Math.max(1, Math.min(quantity, item.product.stock)),
                            }
                            : item
                    ),
                }));
            },

            removeFromCart: (productId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.productId !== productId),
                }));
            },

            clearCart: () => {
                set({ cart: [] });
            },

            setCartOpen: (open) => {
                set({ isCartOpen: open });
            },

            getCartTotal: () => {
                return get().cart.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
            },

            getCartCount: () => {
                return get().cart.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'techzone_cart',
            partialize: (state) => ({ cart: state.cart }),
        }
    )
);
