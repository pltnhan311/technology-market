import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
    items: { label: string; href: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            {items.map((item, index) => (
                <div key={item.href} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
                    {index === items.length - 1 ? (
                        <span className="text-gray-900 font-medium">{item.label}</span>
                    ) : (
                        <Link
                            to={item.href}
                            className="hover:text-primary transition-colors"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}
