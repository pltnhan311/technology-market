import { User, AuthToken } from '@/types';

// Simple demo auth - stores users in localStorage
// WARNING: This is INSECURE and for demo only!

export interface RegisterData {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export const register = async (data: RegisterData): Promise<{ user: User; token: AuthToken }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem('techzone_users') || '[]');

    // Check if email exists
    if (users.some((u: any) => u.email === data.email)) {
        throw new Error('Email đã được sử dụng');
    }

    // Validate password match
    if (data.password !== data.confirmPassword) {
        throw new Error('Mật khẩu xác nhận không khớp');
    }

    // Validate password length
    if (data.password.length < 8) {
        throw new Error('Mật khẩu phải có ít nhất 8 ký tự');
    }

    // Create user (NO PASSWORD HASHING - demo only!)
    const user: any = {
        id: `user_${Date.now()}`,
        email: data.email,
        name: data.name,
        phone: data.phone,
        addresses: [],
        createdAt: new Date().toISOString(),
        password: data.password, // INSECURE - demo only
    };

    users.push(user);
    localStorage.setItem('techzone_users', JSON.stringify(users));

    // Remove password from response
    const { password, ...userWithoutPassword } = user;

    // Create auth token
    const token: AuthToken = {
        userId: user.id,
        email: user.email,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    };

    return { user: userWithoutPassword, token };
};

export const login = async (email: string, password: string): Promise<{ user: User; token: AuthToken }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = JSON.parse(localStorage.getItem('techzone_users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
        throw new Error('Email hoặc mật khẩu không đúng');
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    const token: AuthToken = {
        userId: user.id,
        email: user.email,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return { user: userWithoutPassword, token };
};

export const getUserById = (userId: string): User | null => {
    const users = JSON.parse(localStorage.getItem('techzone_users') || '[]');
    const user = users.find((u: any) => u.id === userId);

    if (!user) return null;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

export const updateUser = (userId: string, updates: Partial<User>): User => {
    const users = JSON.parse(localStorage.getItem('techzone_users') || '[]');
    const index = users.findIndex((u: any) => u.id === userId);

    if (index === -1) {
        throw new Error('User not found');
    }

    users[index] = { ...users[index], ...updates };
    localStorage.setItem('techzone_users', JSON.stringify(users));

    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
};
