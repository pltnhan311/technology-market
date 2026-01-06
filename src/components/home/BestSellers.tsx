import { seedProducts } from '@/data/seed-products';
import { ProductCard } from '@/components/product/ProductCard';

export function BestSellers() {
    const bestSellers = seedProducts.filter((p) => p.isPopular).slice(0, 8);

    return (
        <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Bán chạy nhất
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {bestSellers.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
