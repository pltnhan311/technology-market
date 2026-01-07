import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Copy, Package, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function OrderConfirmationPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const orderId = searchParams.get('id');
    const [order, setOrder] = useState<Order | null>(null);
    const [showAnimation, setShowAnimation] = useState(true);

    useEffect(() => {
        if (!orderId) {
            navigate('/');
            return;
        }

        // Fetch order from localStorage
        try {
            const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
            const foundOrder = orders.find((o: Order) => o.id === orderId);

            if (!foundOrder) {
                toast.error('Không tìm thấy đơn hàng');
                navigate('/');
                return;
            }

            setOrder(foundOrder);
        } catch (error) {
            console.error('Error fetching order:', error);
            toast.error('Có lỗi xảy ra');
            navigate('/');
        }

        // Hide animation after 3 seconds
        const timer = setTimeout(() => setShowAnimation(false), 3000);
        return () => clearTimeout(timer);
    }, [orderId, navigate]);

    const handleCopyOrderId = () => {
        if (order) {
            navigator.clipboard.writeText(order.id);
            toast.success('Đã copy mã đơn hàng');
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

    const getEstimatedDelivery = () => {
        if (!order) return '';
        const delivery = new Date(order.createdAt);
        delivery.setDate(delivery.getDate() + 2);
        const deliveryEnd = new Date(delivery);
        deliveryEnd.setDate(deliveryEnd.getDate() + 1);

        return `${delivery.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })} - ${deliveryEnd.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })}`;
    };

    if (!order) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto max-w-3xl px-4">
                {/* Success Animation */}
                <div className="text-center mb-8">
                    <div
                        className={`inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 transition-all duration-500 ${showAnimation ? 'scale-0' : 'scale-100'
                            }`}
                    >
                        <CheckCircle2 className="h-12 w-12 text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Đặt hàng thành công!
                    </h1>
                    <p className="text-gray-600">
                        Cảm ơn bạn đã mua hàng tại TechZone
                    </p>
                </div>

                {/* Order Info Card */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Mã đơn hàng</p>
                                <p className="text-2xl font-bold text-primary">#{order.id}</p>
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopyOrderId}
                                title="Copy mã đơn hàng"
                            >
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">
                            Ngày đặt: {formatOrderDate(order.createdAt)}
                        </p>
                    </CardContent>
                </Card>

                {/* Order Summary - Collapsible */}
                <Card className="mb-6">
                    <Accordion type="single" collapsible defaultValue="order-summary">
                        <AccordionItem value="order-summary" className="border-0">
                            <AccordionTrigger className="px-6 hover:no-underline">
                                <span className="font-semibold">Chi tiết đơn hàng</span>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    {/* Items */}
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-3">
                                                <img
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-sm line-clamp-2">
                                                        {item.productName}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        x{item.quantity} - {formatPrice(item.price)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t pt-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Tạm tính:</span>
                                            <span className="font-medium">
                                                {formatPrice(order.subtotal)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Phí vận chuyển:</span>
                                            <span className="font-medium">
                                                {formatPrice(order.shippingFee)}
                                            </span>
                                        </div>
                                        <div className="border-t pt-2 flex justify-between">
                                            <span className="font-semibold">Tổng cộng:</span>
                                            <span className="text-xl font-bold text-primary">
                                                {formatPrice(order.total)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Payment & Shipping */}
                                    <div className="border-t pt-3 space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Thanh toán:</span>
                                            <span className="font-medium">
                                                {order.paymentMethod === 'cod'
                                                    ? 'COD'
                                                    : 'Chuyển khoản'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-1">Giao đến:</p>
                                            <p className="font-medium">
                                                {order.guestInfo?.name} - {order.guestInfo?.phone}
                                            </p>
                                            <p className="text-gray-700">
                                                {order.shippingAddress.address},{' '}
                                                {order.shippingAddress.district},{' '}
                                                {order.shippingAddress.city}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

                {/* Next Steps */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-4">Bước tiếp theo</h3>

                        {order.paymentMethod === 'cod' ? (
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div className="flex items-start gap-3">
                                    <Package className="h-5 w-5 text-primary mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900 mb-1">
                                            Thanh toán khi nhận hàng
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            Vui lòng chuẩn bị{' '}
                                            <strong className="text-primary">
                                                {formatPrice(order.total)}
                                            </strong>{' '}
                                            tiền mặt khi nhận hàng
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200 space-y-3">
                                <div className="flex items-start gap-3">
                                    <Package className="h-5 w-5 text-orange-600 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900 mb-2">
                                            Vui lòng chuyển khoản và gửi ảnh bill qua:
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <a
                                                href="https://zalo.me/0901234567"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-primary hover:underline"
                                            >
                                                <Phone className="h-4 w-4" />
                                                Zalo: 0901234567
                                            </a>
                                            <a
                                                href="mailto:order@techzone.vn"
                                                className="flex items-center gap-2 text-primary hover:underline"
                                            >
                                                📧 Email: order@techzone.vn
                                            </a>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-3">
                                            Đơn hàng sẽ được xử lý sau khi nhận thanh toán (1-2 giờ)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Dự kiến giao hàng:</strong> {getEstimatedDelivery()}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Button
                        onClick={() =>
                            navigate(`/order-tracking?id=${order.id}&phone=${order.guestInfo?.phone}`)
                        }
                        className="flex-1"
                    >
                        Theo dõi đơn hàng
                    </Button>
                    <Link to="/" className="flex-1">
                        <Button variant="outline" className="w-full">
                            Tiếp tục mua sắm
                        </Button>
                    </Link>
                </div>

                {/* Support Info */}
                <div className="text-center text-sm text-gray-600">
                    <p>
                        Cần hỗ trợ? Liên hệ:{' '}
                        <a href="tel:19001234" className="text-primary hover:underline">
                            1900 1234
                        </a>
                    </p>
                </div>
            </div>

            {/* Mobile Sticky Bottom Button */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden z-40">
                <Button
                    onClick={() =>
                        navigate(`/order-tracking?id=${order.id}&phone=${order.guestInfo?.phone}`)
                    }
                    className="w-full"
                >
                    Theo dõi đơn hàng
                </Button>
            </div>
        </div>
    );
}
