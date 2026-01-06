export type Category = 'laptop' | 'phone' | 'accessory' | 'gaming' | 'pc' | 'smarthome';

export interface Product {
    id: string;
    name: string;
    slug: string;
    category: Category;
    brand: string;
    price: number;
    oldPrice?: number;
    description: string;
    fullDescription: string;
    specs: Record<string, string>;
    images: string[];
    stock: number;
    rating: number;
    reviewCount: number;
    isPopular: boolean;
    isFeatured: boolean;
    createdAt: string;
}

export interface CartItem {
    productId: string;
    product: Product;
    quantity: number;
    addedAt: string;
}

export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    addresses: ShippingAddress[];
    createdAt: string;
}

export interface ShippingAddress {
    id: string;
    name: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    isDefault: boolean;
}

export interface AuthToken {
    userId: string;
    email: string;
    expiresAt: string;
}

export interface Order {
    id: string;
    userId?: string;
    guestInfo?: {
        name: string;
        email: string;
        phone: string;
    };
    items: {
        productId: string;
        productName: string;
        productImage: string;
        quantity: number;
        price: number;
    }[];
    shippingAddress: ShippingAddress;
    paymentMethod: 'cod' | 'bank_transfer';
    shippingFee: number;
    subtotal: number;
    total: number;
    status: 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';
    note?: string;
    trackingInfo?: {
        shipper: string;
        estimatedDelivery: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    orderId: string;
    rating: 1 | 2 | 3 | 4 | 5;
    text: string;
    helpfulCount: number;
    createdAt: string;
}
