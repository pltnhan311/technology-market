import { Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getStockBadge } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const stockBadge = getStockBadge(product.stock);
    const savings = product.oldPrice ? product.oldPrice - product.price : 0;

    return (
        <div className="space-y-4">
            {/* Brand */}
            <div className="text-sm text-gray-600">
                Thương hiệu: <span className="font-medium text-primary">{product.brand}</span>
                <span className="mx-2">|</span>
                SKU: <span className="font-medium">{product.id}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                        />
                    ))}
                </div>
                <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviewCount} đánh giá)
                </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl md:text-4xl font-bold text-primary">
                        {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-lg text-gray-400 line-through">
                            {formatPrice(product.oldPrice)}
                        </span>
                    )}
                </div>
                {savings > 0 && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                        Tiết kiệm {formatPrice(savings)}
                    </div>
                )}
            </div>

            {/* Stock Badge */}
            <div>
                <Badge variant={stockBadge.variant} className="text-sm px-3 py-1">
                    {stockBadge.text}
                </Badge>
            </div>

            {/* Short Description */}
            <div className="text-gray-700 leading-relaxed">
                {product.description}
            </div>
        </div>
    );
}
