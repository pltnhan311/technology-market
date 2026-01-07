import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, X as XIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const STATUS_CONFIG = {
    pending: { label: 'Đang xử lý', color: 'bg-yellow-500', icon: Package },
    confirmed: { label: 'Đã xác nhận', color: 'bg-blue-500', icon: CheckCircle },
    shipping: { label: 'Đang giao hàng', color: 'bg-orange-500', icon: Truck },
    delivered: { label: 'Đã giao', color: 'bg-green-500', icon: CheckCircle },
    cancelled: { label: 'Đã hủy', color: 'bg-red-500', icon: XIcon },
};

const STATUS_ORDER = ['pending', 'confirmed', 'shipping', 'delivered'];

export function OrderTrackingPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [orderId, setOrderId] = useState(searchParams.get('id') || '');
    const [phone, setPhone] = useState(searchParams.get('phone') || '');
    const [order, setOrder] = useState<Order | null>(null);
    const [error, setError] = useState('');
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    // Auto-fetch if ID and phone in URL
    useEffect(() => {
        const id = searchParams.get('id');
        const phoneParam = searchParams.get('phone');

        if (id && phoneParam) {
            handleTrackOrder(id, phoneParam);
        }
    }, [searchParams]);

    const handleTrackOrder = (id?: string, phoneNumber?: string) => {
        const searchId = id || orderId;
        const searchPhone = phoneNumber || phone;

        setError('');

        if (!searchId || !searchPhone) {
            setError('Vui lòng nhập đầy đủ mã đơn hàng và số điện thoại');
            return;
        }

        try {
            const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
            const foundOrder = orders.find(
                (o: Order) =>
                    o.id === searchId &&
                    (o.guestInfo?.phone === searchPhone || o.userId)
            );

            if (!foundOrder) {
                setError('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin.');
                setOrder(null);
                return;
            }

            setOrder(foundOrder);
            setSearchParams({ id: searchId, phone: searchPhone });
        } catch (err) {
            console.error('Error tracking order:', err);
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    const handleCancelOrder = () => {
        if (!order) return;

        try {
            const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
            const updatedOrders = orders.map((o: Order) =>
                o.id === order.id
                    ? { ...o, status: 'cancelled', updatedAt: new Date().toISOString() }
                    : o
            );

            localStorage.setItem('techzone_orders', JSON.stringify(updatedOrders));

            setOrder({ ...order, status: 'cancelled' });
            setShowCancelDialog(false);
            toast.success('Đã hủy đơn hàng thành công');
        } catch (err) {
            console.error('Error cancelling order:', err);
            toast.error('Có lỗi xảy ra khi hủy đơn hàng');
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

    // PART 1: Tracking Form
    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto max-w-md px-4">
                    <div className="text-center mb-8">
                        <Package className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Tra cứu đơn hàng
                        </h1>
                        <p className="text-gray-600">
                            Nhập thông tin đơn hàng để theo dõi
                        </p>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleTrackOrder();
                                }}
                                className="space-y-4"
                            >
                                {/* Order ID */}
                                <div>
                                    <Label htmlFor="orderId">Mã đơn hàng</Label>
                                    <Input
                                        id="orderId"
                                        value={orderId}
                                        onChange={(e) => setOrderId(e.target.value)}
                                        placeholder="VD: TZ12345678"
                                        className="mt-1"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Số điện thoại khi đặt hàng"
                                        className="mt-1"
                                    />
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                                        <AlertCircle className="h-4 w-4" />
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button type="submit" className="w-full">
                                    Tra cứu
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    // PART 2: Order Detail
    const currentStatusIndex = getStatusIndex(order.status);
    const StatusIcon = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG]?.icon || Package;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Order Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                Đơn hàng #{order.id}
                            </h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Đặt ngày: {formatOrderDate(order.createdAt)}
                            </p>
                        </div>
                        <Badge
                            className={`${STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG].color
                                } text-white text-base px-4 py-2 w-fit`}
                        >
                            <StatusIcon className="h-4 w-4 mr-2" />
                            {STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG].label}
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
                                            {status === 'delivered' && !isCompleted && !isCancelled && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    Dự kiến: {new Date(new Date(order.createdAt).getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN')}
                                                </p>
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
                                    <p className="font-medium">{order.guestInfo?.name}</p>
                                    <p className="text-gray-700">{order.guestInfo?.phone}</p>
                                    <p className="text-gray-700">{order.guestInfo?.email}</p>
                                    <p className="text-gray-700 mt-2">
                                        {order.shippingAddress.address}, {order.shippingAddress.district},{' '}
                                        {order.shippingAddress.city}
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

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    {order.status === 'pending' && (
                        <Button
                            variant="destructive"
                            onClick={() => setShowCancelDialog(true)}
                            className="sm:w-auto"
                        >
                            Hủy đơn
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => navigate('/')}
                        className="sm:flex-1"
                    >
                        Về trang chủ
                    </Button>
                    <Button onClick={() => setOrder(null)} className="sm:flex-1">
                        Tra cứu đơn khác
                    </Button>
                </div>

                {/* Cancel Confirmation Dialog */}
                <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Xác nhận hủy đơn hàng</AlertDialogTitle>
                            <AlertDialogDescription>
                                Bạn có chắc muốn hủy đơn hàng #{order.id}? Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Không</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleCancelOrder}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Hủy đơn hàng
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
