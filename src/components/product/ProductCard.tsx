import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getStockBadge } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const stockBadge = getStockBadge(product.stock);

    return (
        <Link to={`/product/${product.slug}`}>
            <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Popular Badge */}
                {product.isPopular && (
                    <Badge variant="secondary" className="absolute right-2 top-2 z-10">
                        Bán chạy
                    </Badge>
                )}

                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Hết hàng</span>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Brand */}
                    <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

                    {/* Product Name */}
                    <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(product.rating)
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-gray-200 text-gray-200'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500">
                            ({product.reviewCount})
                        </span>
                    </div>

                    {/* Price */}
                    <div className="mb-2">
                        <p className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                {formatPrice(product.oldPrice)}
                            </p>
                        )}
                    </div>

                    {/* Stock Badge */}
                    <Badge variant={stockBadge.variant} className="text-xs">
                        {stockBadge.text}
                    </Badge>
                </div>
            </Card>
        </Link>
    );
}
