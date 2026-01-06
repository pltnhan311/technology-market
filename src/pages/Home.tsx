import { HeroSection } from '@/components/home/HeroSection';
import { CategoriesGrid } from '@/components/home/CategoriesGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BestSellers } from '@/components/home/BestSellers';
import { TrustBadges } from '@/components/home/TrustBadges';

export function Home() {
    return (
        <div>
            <HeroSection />
            <CategoriesGrid />
            <FeaturedProducts />
            <BestSellers />
            <TrustBadges />
        </div>
    );
}
