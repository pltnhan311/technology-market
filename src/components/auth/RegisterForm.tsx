import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const registerSchema = z
    .object({
        name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
        email: z.string().email('Email không hợp lệ'),
        phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)'),
        password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
        confirmPassword: z.string(),
        agreedToTerms: z.boolean().refine((val) => val, {
            message: 'Bạn phải đồng ý với điều khoản',
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Mật khẩu xác nhận không khớp',
        path: ['confirmPassword'],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
    onSuccess: () => void;
    onSwitchToLogin: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
    const { register: registerUser } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            agreedToTerms: false,
        },
    });

    const agreedToTerms = watch('agreedToTerms');

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setError('');

        try {
            await registerUser(data);
            toast.success('Đăng ký thành công!');
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Đã có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Error Banner */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Name */}
            <div>
                <Label htmlFor="name">
                    Họ và tên <span className="text-error">*</span>
                </Label>
                <Input
                    id="name"
                    {...register('name')}
                    className={errors.name ? 'border-error' : ''}
                    placeholder="Nguyễn Văn A"
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-error">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <Label htmlFor="email">
                    Email <span className="text-error">*</span>
                </Label>
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'border-error' : ''}
                    placeholder="name@example.com"
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email.message}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <Label htmlFor="phone">
                    Số điện thoại <span className="text-error">*</span>
                </Label>
                <Input
                    id="phone"
                    {...register('phone')}
                    className={errors.phone ? 'border-error' : ''}
                    placeholder="0901234567"
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-error">{errors.phone.message}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <Label htmlFor="password">
                    Mật khẩu <span className="text-error">*</span>
                </Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password')}
                        className={errors.password ? 'border-error' : ''}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {errors.password && (
                    <p className="mt-1 text-sm text-error">{errors.password.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-600">Mật khẩu tối thiểu 8 ký tự</p>
            </div>

            {/* Confirm Password */}
            <div>
                <Label htmlFor="confirmPassword">
                    Xác nhận mật khẩu <span className="text-error">*</span>
                </Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword')}
                        className={errors.confirmPassword ? 'border-error' : ''}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-error">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-2">
                <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setValue('agreedToTerms', checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    Tôi đồng ý với{' '}
                    <a href="/terms" target="_blank" className="text-primary hover:underline">
                        Điều khoản sử dụng
                    </a>{' '}
                    và{' '}
                    <a href="/policies" target="_blank" className="text-primary hover:underline">
                        Chính sách bảo mật
                    </a>
                </label>
            </div>
            {errors.agreedToTerms && (
                <p className="text-sm text-error">{errors.agreedToTerms.message}</p>
            )}

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full h-11"
                disabled={!agreedToTerms || isLoading}
            >
                {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>

            {/* Login Link */}
            <div className="text-center text-sm pt-4 border-t">
                <span className="text-gray-600">Đã có tài khoản? </span>
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-primary hover:underline font-medium"
                >
                    Đăng nhập
                </button>
            </div>
        </form>
    );
}
