import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthToken, ShippingAddress } from '@/types';
import { register as registerAuth, login as loginAuth, updateUser as updateUserAuth } from '@/lib/auth';
import { RegisterData } from '@/lib/auth';

interface AuthState {
    user: User | null;
    authToken: AuthToken | null;
    isAuthenticated: boolean;

    // Auth actions
    register: (data: RegisterData) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => Promise<void>;

    // Address actions
    addAddress: (address: Omit<ShippingAddress, 'id'>) => Promise<void>;
    updateAddress: (id: string, address: Partial<ShippingAddress>) => Promise<void>;
    deleteAddress: (id: string) => Promise<void>;
    setDefaultAddress: (id: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            authToken: null,
            isAuthenticated: false,

            register: async (data) => {
                const { user, token } = await registerAuth(data);
                set({ user, authToken: token, isAuthenticated: true });
            },

            login: async (email, password) => {
                const { user, token } = await loginAuth(email, password);
                set({ user, authToken: token, isAuthenticated: true });
            },

            logout: () => {
                set({ user: null, authToken: null, isAuthenticated: false });
            },

            updateProfile: async (data) => {
                const { user } = get();
                if (!user) throw new Error('Not authenticated');

                const updatedUser = updateUserAuth(user.id, data);
                set({ user: updatedUser });
            },

            addAddress: async (address) => {
                const { user } = get();
                if (!user) throw new Error('Not authenticated');

                const newAddress: ShippingAddress = {
                    id: `addr_${Date.now()}`,
                    ...address,
                };

                // If this is the first address or isDefault is true, set as default
                const addresses = [...user.addresses];
                if (newAddress.isDefault || addresses.length === 0) {
                    addresses.forEach((addr) => (addr.isDefault = false));
                    newAddress.isDefault = true;
                }

                addresses.push(newAddress);
                const updatedUser = updateUserAuth(user.id, { addresses });
                set({ user: updatedUser });
            },

            updateAddress: async (id, address) => {
                const { user } = get();
                if (!user) throw new Error('Not authenticated');

                const addresses = user.addresses.map((addr) => {
                    if (addr.id === id) {
                        const updated = { ...addr, ...address };
                        // If setting as default, unset all others
                        if (updated.isDefault) {
                            user.addresses.forEach((a) => {
                                if (a.id !== id) a.isDefault = false;
                            });
                        }
                        return updated;
                    }
                    return addr;
                });

                const updatedUser = updateUserAuth(user.id, { addresses });
                set({ user: updatedUser });
            },

            deleteAddress: async (id) => {
                const { user } = get();
                if (!user) throw new Error('Not authenticated');

                const addresses = user.addresses.filter((addr) => addr.id !== id);

                // If we deleted the default address and there are still addresses,
                // set the first one as default
                if (addresses.length > 0 && !addresses.some((addr) => addr.isDefault)) {
                    addresses[0].isDefault = true;
                }

                const updatedUser = updateUserAuth(user.id, { addresses });
                set({ user: updatedUser });
            },

            setDefaultAddress: async (id) => {
                const { user } = get();
                if (!user) throw new Error('Not authenticated');

                const addresses = user.addresses.map((addr) => ({
                    ...addr,
                    isDefault: addr.id === id,
                }));

                const updatedUser = updateUserAuth(user.id, { addresses });
                set({ user: updatedUser });
            },
        }),
        {
            name: 'techzone_auth',
            partialize: (state) => ({
                user: state.user,
                authToken: state.authToken,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);
