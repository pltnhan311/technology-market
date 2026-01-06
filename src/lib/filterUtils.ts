import { Product } from '@/types';

export function filterByPriceRange(products: Product[], min: number, max: number): Product[] {
    return products.filter((p) => p.price >= min && p.price < max);
}

export function filterByBrands(products: Product[], brands: string[]): Product[] {
    if (brands.length === 0) return products;
    return products.filter((p) => brands.includes(p.brand));
}

export function filterByRAM(products: Product[], ramOptions: string[]): Product[] {
    if (ramOptions.length === 0) return products;
    return products.filter((p) => {
        const ram = p.specs['RAM'];
        return ram && ramOptions.some((option) => ram.includes(option));
    });
}

export function filterByStorage(products: Product[], storageOptions: string[]): Product[] {
    if (storageOptions.length === 0) return products;
    return products.filter((p) => {
        const storage = p.specs['Ổ cứng'];
        return storage && storageOptions.some((option) => storage.includes(option));
    });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
    const sorted = [...products];

    switch (sortBy) {
        case 'price-asc':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'popular':
        default:
            return sorted.sort((a, b) => {
                if (a.isPopular && !b.isPopular) return -1;
                if (!a.isPopular && b.isPopular) return 1;
                return b.rating - a.rating;
            });
    }
}

export function getUniqueBrands(products: Product[]): string[] {
    const brands = new Set(products.map((p) => p.brand));
    return Array.from(brands).sort();
}

export function paginateProducts(products: Product[], page: number, pageSize: number = 12) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return {
        items: products.slice(startIndex, endIndex),
        totalPages: Math.ceil(products.length / pageSize),
        totalItems: products.length,
        currentPage: page,
    };
}
