import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { useCheckoutStore, ShippingInfo } from '@/store/checkoutStore';
import { CITIES, DISTRICTS } from '@/lib/addressData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const shippingSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    phone: z
        .string()
        .regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)'),
    email: z.string().email('Email không hợp lệ'),
    address: z.string().min(10, 'Địa chỉ quá ngắn (tối thiểu 10 ký tự)'),
    city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
    district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

export function ShippingForm() {
    const navigate = useNavigate();
    const { shippingInfo, setShippingInfo, setStep } = useCheckoutStore();

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm<ShippingFormData>({
        resolver: zodResolver(shippingSchema),
        mode: 'onBlur',
        defaultValues: shippingInfo || {
            name: '',
            phone: '',
            email: '',
            address: '',
            city: '',
            district: '',
        },
    });

    const selectedCity = watch('city');

    const handleCityChange = (value: string) => {
        setValue('city', value, { shouldValidate: true });
        setValue('district', '', { shouldValidate: false });
    };

    const handleDistrictChange = (value: string) => {
        setValue('district', value, { shouldValidate: true });
    };

    const onSubmit = (data: ShippingFormData) => {
        setShippingInfo(data as ShippingInfo);
        setStep(2);
    };

    const districtOptions =
        DISTRICTS[selectedCity] || DISTRICTS.default || [];

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
                Thông tin giao hàng
            </h2>

            {/* Name */}
            <div>
                <Label htmlFor="name">
                    Họ và tên <span className="text-error">*</span>
                </Label>
                <Input
                    id="name"
                    {...register('name')}
                    placeholder="Nguyễn Văn A"
                    className={errors.name ? 'border-error' : ''}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.name.message}
                    </p>
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
                    placeholder="0901234567"
                    className={errors.phone ? 'border-error' : ''}
                />
                {errors.phone && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.phone.message}
                    </p>
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
                    placeholder="nguyenvana@gmail.com"
                    className={errors.email ? 'border-error' : ''}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Address */}
            <div>
                <Label htmlFor="address">
                    Địa chỉ <span className="text-error">*</span>
                </Label>
                <Textarea
                    id="address"
                    {...register('address')}
                    placeholder="Số nhà, tên đường"
                    rows={2}
                    className={errors.address ? 'border-error' : ''}
                />
                {errors.address && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.address.message}
                    </p>
                )}
            </div>

            {/* City */}
            <div>
                <Label htmlFor="city">
                    Tỉnh/Thành phố <span className="text-error">*</span>
                </Label>
                <Select value={selectedCity} onValueChange={handleCityChange}>
                    <SelectTrigger
                        className={errors.city ? 'border-error' : ''}
                    >
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                        {CITIES.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                                {city.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.city && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.city.message}
                    </p>
                )}
            </div>

            {/* District */}
            <div>
                <Label htmlFor="district">
                    Quận/Huyện <span className="text-error">*</span>
                </Label>
                <Select
                    value={watch('district')}
                    onValueChange={handleDistrictChange}
                    disabled={!selectedCity}
                >
                    <SelectTrigger
                        className={errors.district ? 'border-error' : ''}
                    >
                        <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                        {districtOptions.map((district) => (
                            <SelectItem key={district.value} value={district.value}>
                                {district.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.district && (
                    <p className="mt-1 text-sm text-error flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.district.message}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/')}
                    className="sm:w-auto"
                >
                    Quay lại giỏ hàng
                </Button>
                <Button
                    type="submit"
                    disabled={!isValid}
                    className="sm:flex-1"
                >
                    Tiếp tục
                </Button>
            </div>
        </form>
    );
}
