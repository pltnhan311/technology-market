import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, X as XIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { seedProducts } from '@/data/seed-products';
import { CITIES, DISTRICTS } from '@/lib/addressData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/product/Breadcrumb';

const STATUS_CONFIG = {
    pending: { label: 'Đang xử lý', color: 'bg-yellow-500', icon: Package },
    confirmed: { label: 'Đã xác nhận', color: 'bg-blue-500', icon: CheckCircle },
    shipping: { label: 'Đang giao hàng', color: 'bg-orange-500', icon: Truck },
    delivered: { label: 'Đã giao', color: 'bg-green-500', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'bg-red-500', icon: XIcon },
};

const STATUS_ORDER = ['pending', 'confirmed', 'shipping', 'delivered'];

export function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();
    const [order, setOrder] = useState<Order | null>(null);

    useEffect(() => {
        if (!orderId || !user) {
            navigate('/orders');
            return;
        }

        // Fetch order from localStorage
        try {
            const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
            const foundOrder = orders.find((o: Order) => o.id === orderId && o.userId === user.id);

            if (!foundOrder) {
                toast.error('Không tìm thấy đơn hàng');
                navigate('/orders');
                return;
            }

            setOrder(foundOrder);
        } catch (error) {
            console.error('Error fetching order:', error);
            toast.error('Có lỗi xảy ra');
            navigate('/orders');
        }
    }, [orderId, user, navigate]);

    const handleBuyAgain = () => {
        if (!order) return;

        let addedCount = 0;
        order.items.forEach((item) => {
            try {
                // Find product in seed data
                const product = seedProducts.find((p) => p.id === item.productId);
                if (product) {
                    addToCart(product, item.quantity);
                    addedCount++;
                }
            } catch (err) {
                console.error('Error adding product:', item.productId, err);
            }
        });

        if (addedCount > 0) {
            toast.success(`Đã thêm ${addedCount} sản phẩm vào giỏ hàng`);
            navigate('/');
        } else {
            toast.error('Không thể thêm sản phẩm vào giỏ hàng');
        }
    };

    const formatOrderDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusIndex = (status: string) => {
        return STATUS_ORDER.indexOf(status);
    };

    if (!order) {
        return null;
    }

    const currentStatusIndex = getStatusIndex(order.status);
    const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
    const StatusIcon = statusConfig?.icon || Package;

    // Convert city and district values to labels for display
    const cityLabel = CITIES.find((c) => c.value === order.shippingAddress.city)?.label || order.shippingAddress.city;
    const districtLabel = DISTRICTS[order.shippingAddress.city]?.find((d) => d.value === order.shippingAddress.district)?.label || order.shippingAddress.district;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Breadcrumb */}
                <Breadcrumb
                    items={[
                        { label: 'Tài khoản', href: '/profile' },
                        { label: 'Đơn hàng', href: '/orders' },
                        { label: `#${order.id}`, href: `/orders/${order.id}` },
                    ]}
                />

                {/* Order Header */}
                <div className="mb-8 mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Đơn hàng #{order.id}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Đặt ngày: {formatOrderDate(order.createdAt)}
                            </p>
                        </div>
                        <Badge className={`${statusConfig.color} text-white text-base px-4 py-2 w-fit`}>
                            <StatusIcon className="h-4 w-4 mr-2" />
                            {statusConfig.label}
                        </Badge>
                    </div>
                </div>

                {/* Order Timeline */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-6">Trạng thái đơn hàng</h3>
                        <div className="space-y-6">
                            {STATUS_ORDER.map((status, index) => {
                                const config = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];
                                const Icon = config.icon;
                                const isCompleted = index <= currentStatusIndex;
                                const isCurrent = index === currentStatusIndex && order.status !== 'cancelled';
                                const isCancelled = order.status === 'cancelled';

                                return (
                                    <div key={status} className="flex gap-4">
                                        {/* Icon */}
                                        <div className="flex flex-col items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${isCancelled && status !== 'pending'
                                                    ? 'bg-gray-200'
                                                    : isCompleted
                                                        ? config.color
                                                        : 'bg-gray-200'
                                                    } ${isCurrent ? 'ring-4 ring-offset-2 ring-primary/30' : ''}`}
                                            >
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            {index < STATUS_ORDER.length - 1 && (
                                                <div
                                                    className={`w-0.5 h-12 ${isCancelled || !isCompleted || index >= currentStatusIndex
                                                        ? 'bg-gray-200'
                                                        : config.color
                                                        }`}
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pb-6">
                                            <p
                                                className={`font-semibold ${isCancelled && status !== 'pending'
                                                    ? 'text-gray-400'
                                                    : isCompleted
                                                        ? 'text-gray-900'
                                                        : 'text-gray-400'
                                                    }`}
                                            >
                                                {config.label}
                                            </p>
                                            {isCurrent && status === 'shipping' && (
                                                <div className="mt-2 text-sm">
                                                    <p className="text-gray-700">
                                                        Shipper: Nguyễn Văn A - 0912345678
                                                    </p>
                                                    <p className="text-gray-600 mt-1">
                                                        Đơn hàng đang trên đường giao đến bạn
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Cancelled Status */}
                            {order.status === 'cancelled' && (
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-500">
                                            <XIcon className="h-5 w-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">Đã hủy</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {formatOrderDate(order.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Products */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-4">Sản phẩm</h3>
                            <div className="space-y-3">
                                {order.items.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium line-clamp-2">
                                                {item.productName}
                                            </p>
                                            <p className="text-sm text-gray-600">x{item.quantity}</p>
                                            <p className="text-sm font-semibold text-primary">
                                                {formatPrice(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t mt-4 pt-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Tạm tính:</span>
                                    <span>{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span>Phí vận chuyển:</span>
                                    <span>{formatPrice(order.shippingFee)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Tổng:</span>
                                    <span className="text-primary">{formatPrice(order.total)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipping & Payment Info */}
                    <div className="space-y-6">
                        {/* Shipping */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-3">Thông tin giao hàng</h3>
                                <div className="text-sm space-y-1">
                                    <p className="font-medium">{order.shippingAddress.name || user?.name}</p>
                                    <p className="text-gray-700">{order.shippingAddress.phone || user?.phone}</p>
                                    <p className="text-gray-700">{user?.email}</p>
                                    <p className="text-gray-700 mt-2">
                                        {order.shippingAddress.address}, {districtLabel}, {cityLabel}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment */}
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold mb-3">Thanh toán</h3>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Phương thức:</span>
                                        <span className="font-medium">
                                            {order.paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Số tiền:</span>
                                        <span className="font-semibold text-primary">
                                            {formatPrice(order.total)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Order Note */}
                {order.note && (
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Ghi chú</h3>
                            <p className="text-sm text-gray-700">{order.note}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" onClick={() => navigate('/orders')} className="sm:flex-1">
                        Quay lại đơn hàng
                    </Button>
                    {order.status === 'delivered' && (
                        <Button onClick={handleBuyAgain} className="sm:flex-1">
                            Mua lại
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
