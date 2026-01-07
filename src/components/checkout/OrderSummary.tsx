import { useCartStore } from '@/store/cartStore';
import { useCheckoutStore } from '@/store/checkoutStore';
import { getShippingFee } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderSummaryProps {
    showShipping?: boolean;
    showEstimatedDelivery?: boolean;
}

export function OrderSummary({
    showShipping = false,
    showEstimatedDelivery = false,
}: OrderSummaryProps) {
    const { cart, getCartTotal } = useCartStore();
    const { shippingInfo } = useCheckoutStore();
    const subtotal = getCartTotal();

    const shippingFee =
        showShipping && shippingInfo ? getShippingFee(shippingInfo.city) : 0;
    const total = subtotal + shippingFee;

    // Calculate estimated delivery (2-3 days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
    const deliveryEndDate = new Date(estimatedDelivery);
    deliveryEndDate.setDate(deliveryEndDate.getDate() + 1);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="text-lg">Đơn hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {cart.map((item) => (
                        <div key={item.productId} className="flex gap-3">
                            <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 line-clamp-2">
                                    {item.product.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    x{item.quantity} - {formatPrice(item.product.price)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                    {/* Subtotal */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tạm tính:</span>
                        <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Phí vận chuyển:</span>
                        {showShipping && shippingFee > 0 ? (
                            <span className="font-medium">{formatPrice(shippingFee)}</span>
                        ) : (
                            <span className="text-gray-500">Sẽ tính ở bước tiếp theo</span>
                        )}
                    </div>

                    {/* Total */}
                    <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold">Tổng cộng:</span>
                        <span className="text-2xl font-bold text-primary">
                            {formatPrice(total)}
                        </span>
                    </div>

                    {/* Estimated Delivery */}
                    {showEstimatedDelivery && (
                        <div className="pt-2 text-sm text-gray-600">
                            <p>
                                <strong>Dự kiến giao hàng:</strong>{' '}
                                {formatDate(estimatedDelivery)} - {formatDate(deliveryEndDate)}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
