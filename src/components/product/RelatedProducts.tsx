import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { Product, Category } from '@/types';
import { seedProducts } from '@/data/seed-products';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';

interface RelatedProductsProps {
    category: Category;
    currentProductId: string;
}

export function RelatedProducts({ category, currentProductId }: RelatedProductsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: false,
        slidesToScroll: 1,
        dragFree: true,
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    // Get related products from the same category, excluding current product
    const relatedProducts = seedProducts
        .filter((p) => p.category === category && p.id !== currentProductId)
        .slice(0, 8);

    if (relatedProducts.length === 0) return null;

    return (
        <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Sản phẩm tương tự
                </h2>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="h-9 w-9"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="h-9 w-9"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4 md:gap-6">
                    {relatedProducts.map((product) => (
                        <div
                            key={product.id}
                            className="flex-none w-[280px] md:w-[320px]"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
