import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface SearchDropdownProps {
    results: Product[];
    query: string;
    selectedIndex: number;
    onClose: () => void;
    onSelect: (index: number) => void;
}

export function SearchDropdown({
    results,
    query,
    selectedIndex,
    onClose,
    onSelect,
}: SearchDropdownProps) {
    const navigate = useNavigate();

    if (!query || query.trim().length < 2) {
        return null;
    }

    const displayResults = results.slice(0, 5);
    const totalCount = results.length;

    const handleViewAll = () => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
        onClose();
    };

    const handleProductClick = (product: Product) => {
        navigate(`/product/${product.slug}`);
        onClose();
    };

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
            {displayResults.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                    <p className="text-lg">Không tìm thấy kết quả</p>
                    <p className="text-sm mt-2">Vui lòng thử với từ khóa khác</p>
                </div>
            ) : (
                <>
                    <div className="p-2">
                        {displayResults.map((product, index) => (
                            <button
                                key={product.id}
                                onClick={() => handleProductClick(product)}
                                onMouseEnter={() => onSelect(index)}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${selectedIndex === index
                                    ? 'bg-primary/10'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                {/* Thumbnail */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-14 h-14 object-cover rounded"
                                />

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <p
                                        className="text-sm font-medium text-gray-900 line-clamp-2"
                                        dangerouslySetInnerHTML={{
                                            __html: product.name.replace(
                                                new RegExp(`(${query})`, 'gi'),
                                                '<mark class="bg-yellow-200">$1</mark>'
                                            ),
                                        }}
                                    />
                                    <p className="text-sm text-primary font-semibold mt-1">
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* View All Results */}
                    {totalCount > 5 && (
                        <div className="border-t p-3">
                            <button
                                onClick={handleViewAll}
                                className="w-full text-center text-sm text-primary hover:text-primary-hover font-medium"
                            >
                                Xem tất cả {totalCount} kết quả
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
