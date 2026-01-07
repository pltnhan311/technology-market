import { useState } from 'react';
import { Banknote, Building2, Package } from 'lucide-react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { getShippingFee } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { AddressRecap } from '@/components/checkout/AddressRecap';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

export function PaymentMethodForm() {
    const { shippingInfo, paymentMethod, orderNote, setPaymentMethod, setOrderNote, setStep } =
        useCheckoutStore();

    const [selectedMethod, setSelectedMethod] = useState<'cod' | 'bank_transfer'>(
        paymentMethod || 'cod'
    );
    const [note, setNote] = useState(orderNote || '');

    if (!shippingInfo) return null;

    const shippingFee = getShippingFee(shippingInfo.city);

    const handleContinue = () => {
        setPaymentMethod(selectedMethod);
        setOrderNote(note);
        setStep(3);
    };

    const handleBack = () => {
        setStep(1);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Phương thức thanh toán</h2>

            {/* Address Recap */}
            <AddressRecap />

            {/* Payment Method Selection */}
            <div>
                <Label className="text-base font-semibold mb-4 block">
                    Chọn phương thức thanh toán
                </Label>
                <RadioGroup
                    value={selectedMethod}
                    onValueChange={(value) => setSelectedMethod(value as 'cod' | 'bank_transfer')}
                    className="space-y-3"
                >
                    {/* COD Option */}
                    <label
                        htmlFor="cod"
                        className={`flex items-start space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'cod'
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <RadioGroupItem value="cod" id="cod" className="mt-0.5" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <Banknote className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Thanh toán khi nhận hàng (COD)</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Thanh toán bằng tiền mặt khi nhận hàng
                            </p>
                        </div>
                    </label>

                    {/* Bank Transfer Option */}
                    <label
                        htmlFor="bank_transfer"
                        className={`flex items-start space-x-3 border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedMethod === 'bank_transfer'
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" className="mt-0.5" />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                <span className="font-semibold">Chuyển khoản ngân hàng</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                                Chuyển khoản trước, đơn hàng xử lý sau khi nhận được tiền
                            </p>
                        </div>
                    </label>
                </RadioGroup>

                {/* Bank Details (shown when bank_transfer is selected) */}
                {selectedMethod === 'bank_transfer' && (
                    <Card className="mt-4 bg-blue-50 border-blue-200">
                        <CardContent className="p-4 space-y-2">
                            <p className="font-semibold text-gray-900">Thông tin chuyển khoản:</p>
                            <div className="space-y-1 text-sm">
                                <p>
                                    <span className="font-medium">Ngân hàng:</span> Vietcombank
                                </p>
                                <p>
                                    <span className="font-medium">Số tài khoản:</span> 1234567890
                                </p>
                                <p>
                                    <span className="font-medium">Chủ tài khoản:</span> CÔNG TY TECHZONE
                                </p>
                                <p>
                                    <span className="font-medium">Nội dung:</span> TZ [Mã đơn hàng]
                                </p>
                            </div>
                            <p className="text-xs text-gray-700 mt-3 pt-3 border-t border-blue-300">
                                <strong>Lưu ý:</strong> Vui lòng chuyển khoản và gửi ảnh bill qua Zalo:{' '}
                                <a href="tel:0901234567" className="text-primary hover:underline">
                                    0901234567
                                </a>
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Shipping Method (Read-only) */}
            <div>
                <Label className="text-base font-semibold mb-3 block">Phương thức vận chuyển</Label>
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Package className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-medium">Giao hàng tiêu chuẩn</p>
                                    <p className="text-sm text-gray-600">2-3 ngày làm việc</p>
                                </div>
                            </div>
                            <p className="font-semibold text-primary">{formatPrice(shippingFee)}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Order Note */}
            <div>
                <Label htmlFor="orderNote" className="text-base font-semibold mb-2 block">
                    Ghi chú đơn hàng (tùy chọn)
                </Label>
                <Textarea
                    id="orderNote"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="VD: Giao giờ hành chính, gọi trước 15 phút"
                    rows={3}
                />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} className="sm:w-auto">
                    Quay lại
                </Button>
                <Button type="button" onClick={handleContinue} className="sm:flex-1">
                    Tiếp tục
                </Button>
            </div>
        </div>
    );
}
