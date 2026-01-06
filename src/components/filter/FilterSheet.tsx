import { PRICE_RANGES, RAM_OPTIONS, STORAGE_OPTIONS } from '@/lib/constants';
import { useFilterStore } from '@/store/store';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';
import { Category } from '@/types';

interface FilterSheetProps {
    category: Category;
    availableBrands: string[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function FilterSheet({
    category,
    availableBrands,
    open,
    onOpenChange,
}: FilterSheetProps) {
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

    const handleApply = () => {
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Bộ lọc sản phẩm</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 mt-6">
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
                                            id={`sheet-brand-${brand}`}
                                            checked={selectedBrands.includes(brand)}
                                            onCheckedChange={() => toggleBrand(brand)}
                                        />
                                        <label
                                            htmlFor={`sheet-brand-${brand}`}
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
                                            id={`sheet-ram-${ram}`}
                                            checked={selectedRAM.includes(ram)}
                                            onCheckedChange={() => toggleRAM(ram)}
                                        />
                                        <label htmlFor={`sheet-ram-${ram}`} className="text-sm cursor-pointer">
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
                                            id={`sheet-storage-${storage}`}
                                            checked={selectedStorage.includes(storage)}
                                            onCheckedChange={() => toggleStorage(storage)}
                                        />
                                        <label
                                            htmlFor={`sheet-storage-${storage}`}
                                            className="text-sm cursor-pointer"
                                        >
                                            {storage}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <SheetFooter className="mt-6 gap-2">
                    <Button variant="outline" onClick={clearFilters} className="flex-1">
                        Xóa bộ lọc
                    </Button>
                    <Button onClick={handleApply} className="flex-1">
                        Áp dụng
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
