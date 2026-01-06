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
