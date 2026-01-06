import { X } from 'lucide-react';
import { PRICE_RANGES } from '@/lib/constants';
import { useFilterStore } from '@/store/store';
import { Badge } from '@/components/ui/badge';

export function AppliedFilters() {
    const {
        priceRange,
        selectedBrands,
        selectedRAM,
        selectedStorage,
        setPriceRange,
        toggleBrand,
        toggleRAM,
        toggleStorage,
    } = useFilterStore();

    const hasFilters =
        priceRange || selectedBrands.length > 0 || selectedRAM.length > 0 || selectedStorage.length > 0;

    if (!hasFilters) return null;

    const priceLabel = PRICE_RANGES.find((r) => r.id === priceRange)?.label;

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {priceRange && priceLabel && (
                <Badge variant="outline" className="gap-2">
                    Giá: {priceLabel}
                    <button
                        onClick={() => setPriceRange(null)}
                        className="hover:text-primary"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            )}

            {selectedBrands.map((brand) => (
                <Badge key={brand} variant="outline" className="gap-2">
                    Brand: {brand}
                    <button
                        onClick={() => toggleBrand(brand)}
                        className="hover:text-primary"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}

            {selectedRAM.map((ram) => (
                <Badge key={ram} variant="outline" className="gap-2">
                    RAM: {ram}
                    <button
                        onClick={() => toggleRAM(ram)}
                        className="hover:text-primary"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}

            {selectedStorage.map((storage) => (
                <Badge key={storage} variant="outline" className="gap-2">
                    Storage: {storage}
                    <button
                        onClick={() => toggleStorage(storage)}
                        className="hover:text-primary"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
        </div>
    );
}
