import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, MapPin, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

const profileSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ (10 số)'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfilePage() {
    const { user, updateProfile } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user?.name || '',
            phone: user?.phone || '',
        },
    });

    const onSubmit = async (data: ProfileFormData) => {
        setIsLoading(true);
        try {
            await updateProfile(data);
            toast.success('Cập nhật thành công!');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err: any) {
            toast.error(err.message || 'Có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset({
            name: user?.name || '',
            phone: user?.phone || '',
        });
    };

    const getUserInitial = () => {
        if (user && user.name) {
            return user.name.charAt(0).toUpperCase();
        }
        return 'U';
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto max-w-6xl px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Thông tin tài khoản
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-0">
                                <nav className="flex flex-col">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-l-4 border-primary font-medium"
                                    >
                                        <User className="h-5 w-5" />
                                        Thông tin cá nhân
                                    </a>
                                    <a
                                        href="/profile/addresses"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        <MapPin className="h-5 w-5" />
                                        Địa chỉ giao hàng
                                    </a>
                                    <button
                                        disabled
                                        className="flex items-center gap-3 px-4 py-3 text-gray-400 cursor-not-allowed opacity-50"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span>🔒</span>
                                            Đổi mật khẩu
                                        </span>
                                        <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">
                                            Sắp có
                                        </span>
                                    </button>
                                    <a
                                        href="/orders"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        <ShoppingBag className="h-5 w-5" />
                                        Đơn hàng của tôi
                                    </a>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-xl font-semibold mb-6">
                                    Thông tin cá nhân
                                </h2>

                                {/* Success Banner */}
                                {showSuccess && (
                                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 flex items-center gap-2">
                                        <span className="text-green-600">✓</span>
                                        Cập nhật thành công!
                                    </div>
                                )}

                                {/* Avatar */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white font-bold text-3xl">
                                        {getUserInitial()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{user.name}</p>
                                        <button
                                            disabled
                                            className="text-sm text-gray-400 cursor-not-allowed mt-1"
                                        >
                                            Thay đổi ảnh (Sắp có)
                                        </button>
                                    </div>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <Label htmlFor="name">Họ và tên</Label>
                                        <Input
                                            id="name"
                                            {...register('name')}
                                            className={errors.name ? 'border-error' : ''}
                                        />
                                        {errors.name && (
                                            <p className="mt-1 text-sm text-error">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email (Read-only) */}
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={user.email}
                                            readOnly
                                            disabled
                                            className="bg-gray-100 cursor-not-allowed"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            Email không thể thay đổi
                                        </p>
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <Input
                                            id="phone"
                                            {...register('phone')}
                                            className={errors.phone ? 'border-error' : ''}
                                            placeholder="0901234567"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-error">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            type="submit"
                                            disabled={!isDirty || isLoading}
                                            className="flex-1 sm:flex-none"
                                        >
                                            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handleCancel}
                                            disabled={!isDirty || isLoading}
                                            className="flex-1 sm:flex-none"
                                        >
                                            Hủy
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
