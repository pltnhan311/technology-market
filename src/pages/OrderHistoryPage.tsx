import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils';
import { seedProducts } from '@/data/seed-products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
    pending: { label: 'Đang xử lý', icon: Package, color: 'bg-yellow-500' },
    confirmed: { label: 'Đã xác nhận', icon: CheckCircle, color: 'bg-blue-500' },
    shipping: { label: 'Đang giao', icon: Truck, color: 'bg-orange-500' },
    delivered: { label: 'Hoàn thành', icon: CheckCircle, color: 'bg-green-500' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'bg-red-500' },
};

type TabValue = 'all' | 'pending' | 'shipping' | 'delivered' | 'cancelled';

export function OrderHistoryPage() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();
    const [activeTab, setActiveTab] = useState<TabValue>('all');
    const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);

    // Fetch orders from localStorage
    const allOrders: Order[] = JSON.parse(localStorage.getItem('techzone_orders') || '[]');

    // Filter orders by userId
    const userOrders = allOrders.filter((order) => order.userId === user?.id);

    // Sort by date (newest first)
    const sortedOrders = [...userOrders].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Filter by status
    const filteredOrders =
        activeTab === 'all'
            ? sortedOrders
            : sortedOrders.filter((order) => order.status === activeTab);

    // Count by status
    const counts = {
        all: userOrders.length,
        pending: userOrders.filter((o) => o.status === 'pending').length,
        shipping: userOrders.filter((o) => o.status === 'shipping').length,
        delivered: userOrders.filter((o) => o.status === 'delivered').length,
        cancelled: userOrders.filter((o) => o.status === 'cancelled').length,
    };

    const handleViewDetail = (orderId: string) => {
        navigate(`/orders/${orderId}`);
    };

    const handleBuyAgain = (order: Order) => {
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

    const handleCancelOrder = () => {
        if (!cancellingOrder) return;

        try {
            const orders = JSON.parse(localStorage.getItem('techzone_orders') || '[]');
            const updatedOrders = orders.map((o: Order) =>
                o.id === cancellingOrder.id
                    ? { ...o, status: 'cancelled', updatedAt: new Date().toISOString() }
                    : o
            );
            localStorage.setItem('techzone_orders', JSON.stringify(updatedOrders));

            toast.success('Đã hủy đơn hàng');
            setCancellingOrder(null);
            // Reload to update UI
            window.location.reload();
        } catch (err) {
            toast.error('Có lỗi xảy ra');
        }
    };

    const formatOrderDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto max-w-6xl px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Đơn hàng của tôi
                </h1>

                {/* Filter Tabs */}
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as TabValue)}>
                    <TabsList className="mb-6 flex-wrap h-auto">
                        <TabsTrigger value="all" className="gap-2">
                            Tất cả
                            {counts.all > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {counts.all}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="pending" className="gap-2">
                            Đang xử lý
                            {counts.pending > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {counts.pending}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="shipping" className="gap-2">
                            Đang giao
                            {counts.shipping > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {counts.shipping}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="delivered" className="gap-2">
                            Hoàn thành
                            {counts.delivered > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {counts.delivered}
                                </Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="cancelled" className="gap-2">
                            Đã hủy
                            {counts.cancelled > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {counts.cancelled}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab}>
                        {filteredOrders.length === 0 ? (
                            /* Empty State */
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        {activeTab === 'all'
                                            ? 'Bạn chưa có đơn hàng nào'
                                            : `Không có đơn hàng ${STATUS_CONFIG[activeTab]?.label.toLowerCase()}`}
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Khám phá các sản phẩm công nghệ mới nhất
                                    </p>
                                    <Button onClick={() => navigate('/')}>
                                        Khám phá sản phẩm
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            /* Order List */
                            <div className="space-y-4">
                                {filteredOrders.map((order) => {
                                    const statusConfig = STATUS_CONFIG[order.status as keyof typeof STATUS_CONFIG];
                                    const StatusIcon = statusConfig.icon;

                                    return (
                                        <Card key={order.id}>
                                            <CardContent className="p-6">
                                                {/* Order Header */}
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            Đơn hàng #{order.id}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {formatOrderDate(order.createdAt)}
                                                        </p>
                                                    </div>
                                                    <Badge className={`${statusConfig.color} text-white w-fit`}>
                                                        <StatusIcon className="h-4 w-4 mr-1" />
                                                        {statusConfig.label}
                                                    </Badge>
                                                </div>

                                                {/* Items Preview */}
                                                <div className="border-t pt-4 mb-4">
                                                    <div className="space-y-3">
                                                        {order.items.slice(0, 2).map((item, index) => (
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
                                                                    <p className="text-sm text-gray-600">
                                                                        x{item.quantity}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {order.items.length > 2 && (
                                                            <p className="text-sm text-gray-600">
                                                                ...và {order.items.length - 2} sản phẩm khác
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Order Footer */}
                                                <div className="border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm text-gray-600">Tổng tiền:</p>
                                                        <p className="text-2xl font-bold text-primary">
                                                            {formatPrice(order.total)}
                                                        </p>
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        <Button
                                                            variant="outline"
                                                            onClick={() => handleViewDetail(order.id)}
                                                        >
                                                            Xem chi tiết
                                                        </Button>

                                                        {order.status === 'delivered' && (
                                                            <>
                                                                <Button
                                                                    onClick={() => handleBuyAgain(order)}
                                                                >
                                                                    Mua lại
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    disabled
                                                                    className="opacity-50"
                                                                >
                                                                    Đánh giá (Sắp có)
                                                                </Button>
                                                            </>
                                                        )}

                                                        {order.status === 'pending' && (
                                                            <Button
                                                                variant="outline"
                                                                onClick={() => setCancellingOrder(order)}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                Hủy đơn
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>

            {/* Cancel Order Dialog */}
            <AlertDialog
                open={!!cancellingOrder}
                onOpenChange={(open) => !open && setCancellingOrder(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận hủy đơn hàng</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc muốn hủy đơn hàng #{cancellingOrder?.id}? Hành động này
                            không thể hoàn tác.
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
    );
}
