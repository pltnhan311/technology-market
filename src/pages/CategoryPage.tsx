import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { seedProducts } from '@/data/seed-products';
import { CATEGORIES, PRICE_RANGES } from '@/lib/constants';
import {
    filterByPriceRange,
    filterByBrands,
    filterByRAM,
    filterByStorage,
    sortProducts,
    getUniqueBrands,
    paginateProducts,
} from '@/lib/filterUtils';
import { useFilterStore } from '@/store/store';
import { Category } from '@/types';
import { Breadcrumb } from '@/components/product/Breadcrumb';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Pagination } from '@/components/product/Pagination';
import { SortDropdown } from '@/components/product/SortDropdown';
import { FilterSidebar } from '@/components/filter/FilterSidebar';
import { FilterSheet } from '@/components/filter/FilterSheet';
import { AppliedFilters } from '@/components/filter/AppliedFilters';
import { Button } from '@/components/ui/button';

export function CategoryPage() {
    const { slug } = useParams<{ slug: string }>();
    const [filterSheetOpen, setFilterSheetOpen] = useState(false);

    const {
        priceRange,
        selectedBrands,
        selectedRAM,
        selectedStorage,
        sortBy,
        currentPage,
        setCurrentPage,
    } = useFilterStore();

    // Find category info
    const categoryInfo = CATEGORIES.find((c) => c.slug === slug);
    const categoryName = categoryInfo?.name || slug || '';
    const category = slug as Category;

    // Filter products by category
    const categoryProducts = seedProducts.filter((p) => p.category === category);

    // Get available brands for this category
    const availableBrands = useMemo(
        () => getUniqueBrands(categoryProducts),
        [category]
    );

    // Apply filters
    const filteredProducts = useMemo(() => {
        let products = [...categoryProducts];

        // Price range filter
        if (priceRange) {
            const range = PRICE_RANGES.find((r) => r.id === priceRange);
            if (range) {
                products = filterByPriceRange(products, range.min, range.max);
            }
        }

        // Brand filter
        if (selectedBrands.length > 0) {
            products = filterByBrands(products, selectedBrands);
        }

        // RAM filter (laptop only)
        if (category === 'laptop' && selectedRAM.length > 0) {
            products = filterByRAM(products, selectedRAM);
        }

        // Storage filter (laptop only)
        if (category === 'laptop' && selectedStorage.length > 0) {
            products = filterByStorage(products, selectedStorage);
        }

        // Sort products
        products = sortProducts(products, sortBy);

        return products;
    }, [
        category,
        categoryProducts,
        priceRange,
        selectedBrands,
        selectedRAM,
        selectedStorage,
        sortBy,
    ]);

    // Paginate products
    const paginatedData = useMemo(
        () => paginateProducts(filteredProducts, currentPage),
        [filteredProducts, currentPage]
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: categoryName, href: `/category/${slug}` },
                    ]}
                />

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {categoryName}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            ({paginatedData.totalItems} sản phẩm)
                        </p>
                    </div>

                    {/* Mobile Filter Button */}
                    <Button
                        variant="outline"
                        className="md:hidden"
                        onClick={() => setFilterSheetOpen(true)}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Lọc
                    </Button>
                </div>

                {/* Main Layout */}
                <div className="flex gap-6">
                    {/* Filter Sidebar - Desktop Only */}
                    <aside className="hidden md:block flex-shrink-0">
                        <FilterSidebar
                            category={category}
                            availableBrands={availableBrands}
                        />
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        {/* Sort and Applied Filters */}
                        <div className="bg-white p-4 rounded-lg border mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <SortDropdown />
                            </div>
                            <AppliedFilters />
                        </div>

                        {/* Product Grid */}
                        <ProductGrid products={paginatedData.items} />

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={paginatedData.totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Sheet - Mobile Only */}
            <FilterSheet
                category={category}
                availableBrands={availableBrands}
                open={filterSheetOpen}
                onOpenChange={setFilterSheetOpen}
            />
        </div>
    );
}
