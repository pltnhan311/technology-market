import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { seedProducts } from '@/data/seed-products';
import { CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { Breadcrumb } from '@/components/product/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { QuantityPicker } from '@/components/product/QuantityPicker';
import { ProductTabs } from '@/components/product/ProductTabs';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { Button } from '@/components/ui/button';

export function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const { addToCart, setCartOpen } = useCartStore();

    // Find product by slug
    const product = seedProducts.find((p) => p.slug === slug);

    // If product not found, redirect to 404
    if (!product) {
        return <Navigate to="/404" replace />;
    }

    // Get category info
    const categoryInfo = CATEGORIES.find((c) => c.slug === product.category);
    const categoryName = categoryInfo?.name || product.category;

    const isOutOfStock = product.stock === 0;

    const handleAddToCart = () => {
        if (isOutOfStock) return;

        addToCart(product, quantity);
        toast.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`, {
            duration: 2000,
            position: 'top-center',
        });
        setCartOpen(true);
    };

    const handleBuyNow = () => {
        if (isOutOfStock) return;

        addToCart(product, quantity);
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen bg-white">
            <Toaster />
            <div className="container mx-auto max-w-7xl px-4 py-6 md:py-8">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Home', href: '/' },
                        { label: categoryName, href: `/category/${product.category}` },
                        { label: product.name, href: `/product/${slug}` },
                    ]}
                />

                {/* Product Details - Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
                    {/* Left Column - Gallery */}
                    <div>
                        <ProductGallery images={product.images} productName={product.name} />
                    </div>

                    {/* Right Column - Product Info */}
                    <div className="space-y-6">
                        <ProductInfo product={product} />

                        <div className="border-t pt-6">
                            <QuantityPicker
                                stock={product.stock}
                                value={quantity}
                                onChange={setQuantity}
                            />
                        </div>

                        {/* CTA Buttons - Now Enabled */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                size="lg"
                                className="flex-1 h-12"
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
                            </Button>
                            <Button
                                size="lg"
                                variant="secondary"
                                className="flex-1 h-12"
                                onClick={handleBuyNow}
                                disabled={isOutOfStock}
                            >
                                Mua ngay
                            </Button>
                        </div>

                        {/* Features/Highlights */}
                        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Bảo hành chính hãng 12 tháng</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Giao hàng miễn phí toàn quốc</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">✓</span>
                                    <span>Hỗ trợ trả góp 0% lãi suất</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Tabs */}
                <div className="mt-12">
                    <ProductTabs product={product} />
                </div>
            </div>

            {/* Related Products */}
            <div className="bg-gray-50">
                <RelatedProducts
                    category={product.category}
                    currentProductId={product.id}
                />
            </div>

            {/* Mobile Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden z-40">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-xs text-gray-600">Giá</div>
                        <div className="text-xl font-bold text-primary">
                            {formatPrice(product.price)}
                        </div>
                    </div>
                    <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                    >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        {isOutOfStock ? 'Hết hàng' : 'Thêm vào giỏ'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
