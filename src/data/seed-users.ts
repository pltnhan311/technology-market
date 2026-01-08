import { User } from '@/types';

// Sample users with complete information for testing
// Password for all demo users: "demo12345"
export const sampleUsers: User[] = [
    {
        id: 'user_demo_1',
        email: 'nguyenvana@demo.com',
        name: 'Nguyễn Văn A',
        phone: '0901234567',
        addresses: [
            {
                id: 'addr_1',
                name: 'Nguyễn Văn A',
                phone: '0901234567',
                address: '123 Lê Lợi',
                city: 'ho-chi-minh',
                district: 'district-1',
                isDefault: true,
            },
            {
                id: 'addr_2',
                name: 'Nguyễn Văn A (Công ty)',
                phone: '0901234567',
                address: '456 Nguyễn Huệ',
                city: 'ho-chi-minh',
                district: 'district-3',
                isDefault: false,
            },
        ],
        createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
        id: 'user_demo_2',
        email: 'tranthib@demo.com',
        name: 'Trần Thị B',
        phone: '0912345678',
        addresses: [
            {
                id: 'addr_3',
                name: 'Trần Thị B',
                phone: '0912345678',
                address: '789 Hai Bà Trưng',
                city: 'ha-noi',
                district: 'hoan-kiem',
                isDefault: true,
            },
        ],
        createdAt: '2026-01-02T00:00:00.000Z',
    },
];

// Initialize sample users in localStorage if not already present
export const initializeSampleUsers = () => {
    const existingUsers = localStorage.getItem('techzone_users');

    if (!existingUsers) {
        // Add password to demo users (INSECURE - demo only!)
        const usersWithPassword = sampleUsers.map(user => ({
            ...user,
            password: 'demo12345',
        }));

        localStorage.setItem('techzone_users', JSON.stringify(usersWithPassword));
        console.log('✅ Sample users initialized');
    }
};
