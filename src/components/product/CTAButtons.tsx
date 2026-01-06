import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTAButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Button
                size="lg"
                className="flex-1 h-12"
                disabled
                title="Tính năng sắp ra mắt - Phase 2"
            >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ
            </Button>
            <Button
                size="lg"
                variant="secondary"
                className="flex-1 h-12"
                disabled
                title="Tính năng sắp ra mắt - Phase 2"
            >
                Mua ngay
            </Button>
        </div>
    );
}
