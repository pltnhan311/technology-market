import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Filter } from 'lucide-react';
import { seedProducts } from '@/data/seed-products';
import { CATEGORIES, PRICE_RANGES } from '@/lib/constants';
import { searchProducts, saveRecentSearch } from '@/lib/searchUtils';
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
import { Breadcrumb } from '@/components/product/Breadcrumb';
import { ProductGrid } from '@/components/product/ProductGrid';
import { Pagination } from '@/components/product/Pagination';
import { SortDropdown } from '@/components/product/SortDropdown';
import { FilterSidebar } from '@/components/filter/FilterSidebar';
import { FilterSheet } from '@/components/filter/FilterSheet';
import { AppliedFilters } from '@/components/filter/AppliedFilters';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
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

    // Get search results
    const searchResults = useMemo(() => {
        if (!query) return [];
        const results = searchProducts(query, seedProducts);
        // Save to recent searches if we have results
        if (results.length > 0) {
            saveRecentSearch(query);
        }
        return results;
    }, [query]);

    // Get available brands from search results
    const availableBrands = useMemo(
        () => getUniqueBrands(searchResults),
        [searchResults]
    );

    // Determine if we should show laptop-specific filters
    const hasLaptops = searchResults.some((p) => p.category === 'laptop');

    // Apply filters
    const filteredProducts = useMemo(() => {
        let products = [...searchResults];

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

        // RAM filter (if laptops present)
        if (hasLaptops && selectedRAM.length > 0) {
            products = filterByRAM(products, selectedRAM);
        }

        // Storage filter (if laptops present)
        if (hasLaptops && selectedStorage.length > 0) {
            products = filterByStorage(products, selectedStorage);
        }

        // Sort products
        products = sortProducts(products, sortBy);

        return products;
    }, [
        searchResults,
        priceRange,
        selectedBrands,
        selectedRAM,
        selectedStorage,
        sortBy,
        hasLaptops,
    ]);

    // Paginate products
    const paginatedData = useMemo(
        () => paginateProducts(filteredProducts, currentPage),
        [filteredProducts, currentPage]
    );

    // No search query
    if (!query) {
        return (
            <div className="container mx-auto max-w-7xl px-4 py-24 text-center">
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Tìm kiếm sản phẩm
                </h1>
                <p className="text-gray-600">
                    Nhập từ khóa để tìm kiếm sản phẩm bạn cần
                </p>
            </div>
        );
    }

    // No results found
    if (searchResults.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
                    <Breadcrumb
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'Tìm kiếm', href: '/search' },
                            { label: query, href: `/search?q=${query}` },
                        ]}
                    />

                    <div className="mt-12 text-center py-12">
                        <div className="relative inline-block mb-6">
                            <SearchIcon className="h-24 w-24 text-gray-300" />
                            <div className="absolute -right-2 top-0 h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-xl font-bold">✕</span>
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                            Không tìm thấy sản phẩm nào
                        </h1>
                        <p className="text-gray-600 mb-8">
                            Không có kết quả cho từ khóa "{query}"
                        </p>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto mb-8">
                            <h3 className="font-semibold text-gray-900 mb-3">
                                Gợi ý tìm kiếm:
                            </h3>
                            <ul className="text-sm text-gray-700 space-y-2 text-left">
                                <li>• Kiểm tra lỗi chính tả của từ khóa</li>
                                <li>• Thử lại với từ khóa khác ngắn gọn hơn</li>
                                <li>• Thử lại với từ khóa tổng quát hơn</li>
                                <li>• Duyệt các danh mục sản phẩm bên dưới</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-4">
                                Hoặc duyệt theo danh mục:
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center">
                                {CATEGORIES.map((category) => (
                                    <Link key={category.slug} to={`/category/${category.slug}`}>
                                        <Button variant="outline">{category.name}</Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Tìm kiếm', href: '/search' },
                        { label: query, href: `/search?q=${query}` },
                    ]}
                />

                {/* Page Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            Kết quả tìm kiếm cho "{query}"
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
                            category={hasLaptops ? 'laptop' : searchResults[0]?.category || 'laptop'}
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
                category={hasLaptops ? 'laptop' : searchResults[0]?.category || 'laptop'}
                availableBrands={availableBrands}
                open={filterSheetOpen}
                onOpenChange={setFilterSheetOpen}
            />
        </div>
    );
}
