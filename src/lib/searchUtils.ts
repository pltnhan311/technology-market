import { Product } from '@/types';

interface SearchResult {
    product: Product;
    score: number;
}

export function searchProducts(query: string, products: Product[]): Product[] {
    if (!query || query.trim().length === 0) {
        return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    products.forEach((product) => {
        let score = 0;

        // Search in product name (highest priority)
        const nameLower = product.name.toLowerCase();
        if (nameLower.includes(searchTerm)) {
            score += 10;
            if (nameLower.startsWith(searchTerm)) {
                score += 5; // Bonus for starting with search term
            }
        }

        // Search in brand (high priority)
        const brandLower = product.brand.toLowerCase();
        if (brandLower.includes(searchTerm)) {
            score += 5;
        }

        // Search in category
        const categoryLower = product.category.toLowerCase();
        if (categoryLower.includes(searchTerm)) {
            score += 3;
        }

        // Search in description (lower priority)
        const descLower = product.description.toLowerCase();
        if (descLower.includes(searchTerm)) {
            score += 2;
        }

        // Search in specs
        Object.values(product.specs).forEach((value) => {
            if (value.toLowerCase().includes(searchTerm)) {
                score += 1;
            }
        });

        if (score > 0) {
            results.push({ product, score });
        }
    });

    // Sort by score descending, then by popularity
    return results
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            // Secondary sort by popularity
            if (a.product.isPopular && !b.product.isPopular) return -1;
            if (!a.product.isPopular && b.product.isPopular) return 1;
            return b.product.rating - a.product.rating;
        })
        .map((r) => r.product);
}

export function highlightMatch(text: string, query: string): string {
    if (!query || query.trim().length === 0) {
        return text;
    }

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
}

// Recent searches management
const RECENT_SEARCHES_KEY = 'techzone_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export function saveRecentSearch(query: string): void {
    if (!query || query.trim().length === 0) return;

    const searches = getRecentSearches();
    const trimmedQuery = query.trim();

    // Remove if already exists
    const filtered = searches.filter((s) => s.toLowerCase() !== trimmedQuery.toLowerCase());

    // Add to beginning
    const updated = [trimmedQuery, ...filtered].slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
}

export function getRecentSearches(): string[] {
    try {
        const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function clearRecentSearches(): void {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
}
