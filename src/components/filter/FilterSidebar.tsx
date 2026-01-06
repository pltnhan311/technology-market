import { PRICE_RANGES, RAM_OPTIONS, STORAGE_OPTIONS } from '@/lib/constants';
import { useFilterStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Category } from '@/types';

interface FilterSidebarProps {
    category: Category;
    availableBrands: string[];
}

export function FilterSidebar({ category, availableBrands }: FilterSidebarProps) {
    const {
        priceRange,
        selectedBrands,
        selectedRAM,
        selectedStorage,
        setPriceRange,
        toggleBrand,
        toggleRAM,
        toggleStorage,
        clearFilters,
    } = useFilterStore();

    const isLaptopCategory = category === 'laptop';

    return (
        <div className="sticky top-20 w-full md:w-[280px] space-y-6 bg-white p-6 rounded-lg border">
            <h3 className="font-semibold text-lg">Bộ lọc</h3>

            {/* Price Range */}
            <div className="space-y-3">
                <h4 className="font-medium text-sm">Khoảng giá</h4>
                <div className="grid grid-cols-2 gap-2">
                    {PRICE_RANGES.map((range) => (
                        <Button
                            key={range.id}
                            variant={priceRange === range.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPriceRange(priceRange === range.id ? null : range.id)}
                            className="w-full"
                        >
                            {range.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Brand */}
            {availableBrands.length > 0 && (
                <div className="space-y-3">
                    <h4 className="font-medium text-sm">Thương hiệu</h4>
                    <div className="space-y-2">
                        {availableBrands.map((brand) => (
                            <div key={brand} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`brand-${brand}`}
                                    checked={selectedBrands.includes(brand)}
                                    onCheckedChange={() => toggleBrand(brand)}
                                />
                                <label
                                    htmlFor={`brand-${brand}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {brand}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* RAM - Only for Laptop */}
            {isLaptopCategory && (
                <div className="space-y-3">
                    <h4 className="font-medium text-sm">RAM</h4>
                    <div className="space-y-2">
                        {RAM_OPTIONS.map((ram) => (
                            <div key={ram} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`ram-${ram}`}
                                    checked={selectedRAM.includes(ram)}
                                    onCheckedChange={() => toggleRAM(ram)}
                                />
                                <label htmlFor={`ram-${ram}`} className="text-sm cursor-pointer">
                                    {ram}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Storage - Only for Laptop */}
            {isLaptopCategory && (
                <div className="space-y-3">
                    <h4 className="font-medium text-sm">Ổ cứng</h4>
                    <div className="space-y-2">
                        {STORAGE_OPTIONS.map((storage) => (
                            <div key={storage} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`storage-${storage}`}
                                    checked={selectedStorage.includes(storage)}
                                    onCheckedChange={() => toggleStorage(storage)}
                                />
                                <label
                                    htmlFor={`storage-${storage}`}
                                    className="text-sm cursor-pointer"
                                >
                                    {storage}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Clear Filters Button */}
            <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
            >
                Xóa bộ lọc
            </Button>
        </div>
    );
}
