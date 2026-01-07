import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Package, Truck, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { getShippingFee } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { CITIES, DISTRICTS } from '@/lib/addressData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

export function ReviewOrderForm() {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCartStore();
    const { shippingInfo, paymentMethod, orderNote, resetCheckout, setStep } =
        useCheckoutStore();

    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!shippingInfo || !paymentMethod) {
        return null;
    }

    const subtotal = getCartTotal();
    const shippingFee = getShippingFee(shippingInfo.city);
    const total = subtotal + shippingFee;

    const cityLabel =
        CITIES.find((c) => c.value === shippingInfo.city)?.label ||
        shippingInfo.city;
    const districtLabel =
        DISTRICTS[shippingInfo.city]?.find((d) => d.value === shippingInfo.district)
            ?.label || shippingInfo.district;

    // Calculate estimated delivery
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
    const deliveryEndDate = new Date(estimatedDelivery);
    deliveryEndDate.setDate(deliveryEndDate.getDate() + 1);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    const handlePlaceOrder = async () => {
        if (!agreedToTerms) {
            toast.error('Vui lòng đồng ý với điều khoản sử dụng');
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate order ID
            const orderId = `TZ${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

            // Create order object
            const order = {
                id: orderId,
                guestInfo: {
                    name: shippingInfo.name,
                    email: shippingInfo.email,
                    phone: shippingInfo.phone,
                },
                items: cart.map((item) => ({
                    productId: item.productId,
                    productName: item.product.name,
                    productImage: item.product.images[0],
                    quantity: item.quantity,
                    price: item.product.price,
                })),
                shippingAddress: {
                    address: shippingInfo.address,
                    district: districtLabel,
                    city: cityLabel,
                },
                paymentMethod,
                shippingFee,
                subtotal,
                total,
                status: 'pending',
                note: orderNote,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            // Save to localStorage
            const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
            orders.push(order);
            localStorage.setItem('techzone_orders', JSON.stringify(orders));

            // Simulate delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Clear cart and checkout state
            clearCart();
            resetCheckout();

            // Navigate to confirmation page
            navigate(`/order-confirmation?id=${orderId}`);

            toast.success('Đặt hàng thành công!');
        } catch (error) {
            console.error('Order creation failed:', error);
            toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Xác nhận đơn hàng</h2>

            {/* Section 1: Shipping Info */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <Truck className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Thông tin giao hàng
                                </h3>
                                <p className="font-medium">{shippingInfo.name}</p>
                                <p className="text-sm text-gray-700">{shippingInfo.phone}</p>
                                <p className="text-sm text-gray-700">{shippingInfo.email}</p>
                                <p className="text-sm text-gray-700 mt-1">
                                    {shippingInfo.address}, {districtLabel}, {cityLabel}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="link"
                            onClick={() => setStep(1)}
                            className="text-primary"
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Section 2: Payment Method */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <Wallet className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">
                                    Phương thức thanh toán
                                </h3>
                                <p className="text-sm">
                                    {paymentMethod === 'cod'
                                        ? 'Thanh toán khi nhận hàng (COD)'
                                        : 'Chuyển khoản ngân hàng'}
                                </p>
                                {paymentMethod === 'bank_transfer' && (
                                    <div className="mt-3 p-3 bg-blue-50 rounded text-xs space-y-1">
                                        <p><strong>Ngân hàng:</strong> Vietcombank</p>
                                        <p><strong>Số TK:</strong> 1234567890</p>
                                        <p><strong>Chủ TK:</strong> CÔNG TY TECHZONE</p>
                                        <p><strong>Nội dung:</strong> TZ [Mã đơn hàng]</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <Button
                            variant="link"
                            onClick={() => setStep(2)}
                            className="text-primary"
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Section 3: Products */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                            <Package className="h-5 w-5 text-primary mt-0.5" />
                            <h3 className="font-semibold text-gray-900">Sản phẩm đặt mua</h3>
                        </div>
                        <Button
                            variant="link"
                            onClick={() => navigate('/')}
                            className="text-primary"
                        >
                            Chỉnh sửa
                        </Button>
                    </div>
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <div key={item.productId} className="flex gap-4">
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900 line-clamp-2">
                                        {item.product.name}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Số lượng: x{item.quantity}
                                    </p>
                                    <p className="text-sm font-semibold text-primary mt-1">
                                        {formatPrice(item.product.price)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Order Note */}
            {orderNote && (
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">Ghi chú</h3>
                        <p className="text-sm text-gray-700">{orderNote}</p>
                    </CardContent>
                </Card>
            )}

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label
                    htmlFor="terms"
                    className="text-sm leading-relaxed cursor-pointer"
                >
                    Tôi đã đọc và đồng ý với{' '}
                    <a
                        href="/policies"
                        target="_blank"
                        className="text-primary hover:underline"
                    >
                        Chính sách bán hàng
                    </a>{' '}
                    và{' '}
                    <a
                        href="/terms"
                        target="_blank"
                        className="text-primary hover:underline"
                    >
                        Điều khoản sử dụng
                    </a>
                </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    disabled={isSubmitting}
                    className="sm:w-auto"
                >
                    Quay lại
                </Button>
                <Button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={!agreedToTerms || isSubmitting}
                    className="sm:flex-1 h-12 text-lg"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Đang xử lý...
                        </>
                    ) : (
                        'Đặt hàng'
                    )}
                </Button>
            </div>
        </div>
    );
}
