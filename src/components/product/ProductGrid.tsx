import { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
    products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="col-span-full text-center py-12">
                <p className="text-gray-600 text-lg mb-4">Không tìm thấy sản phẩm phù hợp</p>
                <p className="text-gray-500 text-sm">Vui lòng thử điều chỉnh bộ lọc của bạn</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
