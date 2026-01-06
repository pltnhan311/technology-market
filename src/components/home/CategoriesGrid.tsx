import { Link } from 'react-router-dom';
import { Laptop, Monitor, Smartphone, Headphones, Gamepad2, Home } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';

const iconMap = {
    Laptop,
    Monitor,
    Smartphone,
    Headphones,
    Gamepad2,
    Home,
};

export function CategoriesGrid() {
    return (
        <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Danh mục sản phẩm
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {CATEGORIES.map((category) => {
                    const IconComponent = iconMap[category.icon as keyof typeof iconMap];
                    return (
                        <Link
                            key={category.slug}
                            to={`/category/${category.slug}`}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Background decoration */}
                            <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors" />

                            {/* Content */}
                            <div className="relative">
                                <div className="mb-4 inline-flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-white transition-colors">
                                    {IconComponent && <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-primary group-hover:text-white" />}
                                </div>
                                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                                    {category.name}
                                </h3>
                            </div>

                            {/* Arrow icon */}
                            <div className="absolute bottom-4 right-4 text-gray-400 group-hover:text-primary transition-colors">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
