import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ShippingInfo {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    district: string;
}

interface CheckoutState {
    step: 1 | 2 | 3;
    shippingInfo: ShippingInfo | null;
    paymentMethod: 'cod' | 'bank_transfer' | null;
    orderNote: string;
    setStep: (step: 1 | 2 | 3) => void;
    setShippingInfo: (info: ShippingInfo) => void;
    setPaymentMethod: (method: 'cod' | 'bank_transfer') => void;
    setOrderNote: (note: string) => void;
    resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            step: 1,
            shippingInfo: null,
            paymentMethod: null,
            orderNote: '',

            setStep: (step) => set({ step }),

            setShippingInfo: (info) => set({ shippingInfo: info }),

            setPaymentMethod: (method) => set({ paymentMethod: method }),

            setOrderNote: (note) => set({ orderNote: note }),

            resetCheckout: () =>
                set({
                    step: 1,
                    shippingInfo: null,
                    paymentMethod: null,
                    orderNote: '',
                }),
        }),
        {
            name: 'techzone_checkout',
        }
    )
);
