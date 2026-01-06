import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price) + '₫';
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export function getStockBadge(stock: number): { text: string; variant: 'success' | 'error' | 'warning' } {
    if (stock === 0) {
        return { text: 'Hết hàng', variant: 'error' };
    }
    if (stock < 5) {
        return { text: `Chỉ còn ${stock} sản phẩm`, variant: 'warning' };
    }
    return { text: `Còn ${stock} sản phẩm`, variant: 'success' };
}
