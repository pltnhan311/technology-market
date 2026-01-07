import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { ShippingAddress } from '@/types';
import { CITIES, DISTRICTS } from '@/lib/addressData';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const addressSchema = z.object({
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
    phone: z.string().regex(/^0[0-9]{9}$/, 'Số điện thoại không hợp lệ'),
    address: z.string().min(10, 'Địa chỉ quá ngắn'),
    city: z.string().min(1, 'Vui lòng chọn tỉnh/thành phố'),
    district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
    isDefault: z.boolean(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    address?: ShippingAddress;
}

export function AddressModal({ isOpen, onClose, address }: AddressModalProps) {
    const { addAddress, updateAddress } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AddressFormData>({
        resolver: zodResolver(addressSchema),
        defaultValues: address
            ? {
                name: address.name,
                phone: address.phone,
                address: address.address,
                city: address.city,
                district: address.district,
                isDefault: address.isDefault,
            }
            : {
                name: '',
                phone: '',
                address: '',
                city: '',
                district: '',
                isDefault: false,
            },
    });

    const selectedCity = watch('city');
    const isDefault = watch('isDefault');

    const handleCityChange = (value: string) => {
        setValue('city', value, { shouldValidate: true });
        setValue('district', '', { shouldValidate: false });
    };

    const handleDistrictChange = (value: string) => {
        setValue('district', value, { shouldValidate: true });
    };

    const onSubmit = async (data: AddressFormData) => {
        setIsLoading(true);
        try {
            if (address) {
                // Edit existing address
                await updateAddress(address.id, data);
                toast.success('Đã cập nhật địa chỉ');
            } else {
                // Add new address
                await addAddress(data);
                toast.success('Đã thêm địa chỉ mới');
            }
            onClose();
            reset();
        } catch (err: any) {
            toast.error(err.message || 'Có lỗi xảy ra');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    const districtOptions = DISTRICTS[selectedCity] || DISTRICTS.default || [];

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {address ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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

                    {/* Address */}
                    <div>
                        <Label htmlFor="address">
                            Địa chỉ <span className="text-error">*</span>
                        </Label>
                        <Textarea
                            id="address"
                            {...register('address')}
                            className={errors.address ? 'border-error' : ''}
                            placeholder="Số nhà, tên đường"
                            rows={2}
                        />
                        {errors.address && (
                            <p className="mt-1 text-sm text-error">{errors.address.message}</p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <Label htmlFor="city">
                            Tỉnh/Thành phố <span className="text-error">*</span>
                        </Label>
                        <Select value={selectedCity} onValueChange={handleCityChange}>
                            <SelectTrigger className={errors.city ? 'border-error' : ''}>
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
                            <p className="mt-1 text-sm text-error">{errors.city.message}</p>
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
                            <SelectTrigger className={errors.district ? 'border-error' : ''}>
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
                            <p className="mt-1 text-sm text-error">
                                {errors.district.message}
                            </p>
                        )}
                    </div>

                    {/* Is Default Checkbox */}
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isDefault"
                            checked={isDefault}
                            onCheckedChange={(checked) =>
                                setValue('isDefault', checked as boolean)
                            }
                        />
                        <label
                            htmlFor="isDefault"
                            className="text-sm leading-none cursor-pointer"
                        >
                            Đặt làm địa chỉ mặc định
                        </label>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="flex-1"
                        >
                            Hủy
                        </Button>
                        <Button type="submit" disabled={isLoading} className="flex-1">
                            {isLoading ? 'Đang lưu...' : 'Lưu'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
