import { Category } from '@/types';

export const STORAGE_KEYS = {
    PRODUCTS: 'techzone_products',
    CART: 'techzone_cart',
    USER: 'techzone_user',
    AUTH_TOKEN: 'techzone_auth',
    ORDERS: 'techzone_orders',
    REVIEWS: 'techzone_reviews',
} as const;

export const CATEGORIES: { slug: string; name: string; icon: string }[] = [
    { slug: 'laptop', name: 'Laptop', icon: 'Laptop' },
    { slug: 'pc', name: 'PC', icon: 'Monitor' },
    { slug: 'phone', name: 'Điện thoại', icon: 'Smartphone' },
    { slug: 'accessory', name: 'Phụ kiện', icon: 'Headphones' },
    { slug: 'gaming', name: 'Gaming Gear', icon: 'Gamepad2' },
    { slug: 'smarthome', name: 'Smart Home', icon: 'Home' },
];

export const BRANDS = {
    laptop: ['Apple', 'Dell', 'HP', 'Asus', 'Lenovo', 'MSI', 'Acer'],
    phone: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Realme'],
    accessory: ['Logitech', 'Razer', 'SteelSeries', 'Corsair', 'HyperX'],
    gaming: ['Razer', 'Logitech', 'SteelSeries', 'Corsair', 'ASUS ROG'],
    pc: ['Dell', 'HP', 'Asus', 'MSI', 'Custom Build'],
    smarthome: ['Google', 'Amazon', 'Xiaomi', 'TP-Link'],
} as const;

export const CITIES = [
    'Hà Nội',
    'Hồ Chí Minh',
    'Đà Nẵng',
    'Hải Phòng',
    'Cần Thơ',
    'Biên Hòa',
    'Nha Trang',
    'Huế',
] as const;

export const PRICE_RANGES = [
    { id: 'under5', label: '<5tr', min: 0, max: 5000000 },
    { id: '5to10', label: '5-10tr', min: 5000000, max: 10000000 },
    { id: '10to20', label: '10-20tr', min: 10000000, max: 20000000 },
    { id: 'over20', label: '>20tr', min: 20000000, max: Infinity },
] as const;

export const RAM_OPTIONS = ['8GB', '16GB', '32GB'] as const;
export const STORAGE_OPTIONS = ['256GB SSD', '512GB SSD', '1TB SSD'] as const;

export const SORT_OPTIONS = [
    { value: 'popular', label: 'Phổ biến nhất' },
    { value: 'price-asc', label: 'Giá thấp → cao' },
    { value: 'price-desc', label: 'Giá cao → thấp' },
    { value: 'newest', label: 'Mới nhất' },
] as const;
