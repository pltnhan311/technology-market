import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FilterState {
    priceRange: string | null;
    selectedBrands: string[];
    selectedRAM: string[];
    selectedStorage: string[];
    sortBy: string;
    currentPage: number;

    setPriceRange: (range: string | null) => void;
    toggleBrand: (brand: string) => void;
    toggleRAM: (ram: string) => void;
    toggleStorage: (storage: string) => void;
    setSortBy: (sort: string) => void;
    setCurrentPage: (page: number) => void;
    clearFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
    persist(
        (set) => ({
            priceRange: null,
            selectedBrands: [],
            selectedRAM: [],
            selectedStorage: [],
            sortBy: 'popular',
            currentPage: 1,

            setPriceRange: (range) => set({ priceRange: range, currentPage: 1 }),

            toggleBrand: (brand) =>
                set((state) => ({
                    selectedBrands: state.selectedBrands.includes(brand)
                        ? state.selectedBrands.filter((b) => b !== brand)
                        : [...state.selectedBrands, brand],
                    currentPage: 1,
                })),

            toggleRAM: (ram) =>
                set((state) => ({
                    selectedRAM: state.selectedRAM.includes(ram)
                        ? state.selectedRAM.filter((r) => r !== ram)
                        : [...state.selectedRAM, ram],
                    currentPage: 1,
                })),

            toggleStorage: (storage) =>
                set((state) => ({
                    selectedStorage: state.selectedStorage.includes(storage)
                        ? state.selectedStorage.filter((s) => s !== storage)
                        : [...state.selectedStorage, storage],
                    currentPage: 1,
                })),

            setSortBy: (sort) => set({ sortBy: sort, currentPage: 1 }),

            setCurrentPage: (page) => set({ currentPage: page }),

            clearFilters: () =>
                set({
                    priceRange: null,
                    selectedBrands: [],
                    selectedRAM: [],
                    selectedStorage: [],
                    sortBy: 'popular',
                    currentPage: 1,
                }),
        }),
        {
            name: 'techzone-filters',
        }
    )
);
