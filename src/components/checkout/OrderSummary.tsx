import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OrderSummary() {
    const { cart, getCartTotal } = useCartStore();
    const subtotal = getCartTotal();

    return (
        <Card className="sticky top-24">
            <CardHeader>
                <CardTitle className="text-lg">Đơn hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
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
                        <span className="text-gray-500">Sẽ tính ở bước tiếp theo</span>
                    </div>

                    {/* Total */}
                    <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold">Tổng cộng:</span>
                        <span className="text-xl font-bold text-primary">
                            {formatPrice(subtotal)}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
