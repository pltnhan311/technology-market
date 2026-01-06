import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCartStore, CartItem } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
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
import { Button } from '@/components/ui/button';

function CartItemCard({
    item,
    onRemove,
}: {
    item: CartItem;
    onRemove: () => void;
}) {
    const { updateQuantity } = useCartStore();
    const [showRemoveAlert, setShowRemoveAlert] = useState(false);

    const handleDecrease = () => {
        if (item.quantity > 1) {
            updateQuantity(item.productId, item.quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (item.quantity < item.product.stock) {
            updateQuantity(item.productId, item.quantity + 1);
        }
    };

    const subtotal = item.product.price * item.quantity;

    return (
        <>
            <div className="flex gap-4 p-4 border-b">
                {/* Thumbnail */}
                <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                    <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                    />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                        <Link
                            to={`/product/${item.product.slug}`}
                            className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-primary"
                        >
                            {item.product.name}
                        </Link>
                        <button
                            onClick={() => setShowRemoveAlert(true)}
                            className="text-gray-400 hover:text-red-500 p-1"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-1 text-primary font-semibold">
                        {formatPrice(item.product.price)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                            <button
                                onClick={handleDecrease}
                                disabled={item.quantity <= 1}
                                className="p-1 hover:bg-gray-100 disabled:opacity-50"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center text-sm">{item.quantity}</span>
                            <button
                                onClick={handleIncrease}
                                disabled={item.quantity >= item.product.stock}
                                className="p-1 hover:bg-gray-100 disabled:opacity-50"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="text-sm font-semibold text-gray-900">
                            {formatPrice(subtotal)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Remove Confirmation Dialog */}
            <AlertDialog open={showRemoveAlert} onOpenChange={setShowRemoveAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có chắc muốn xóa "{item.product.name}" khỏi giỏ hàng?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={onRemove}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export function CartSheet() {
    const navigate = useNavigate();
    const { cart, isCartOpen, setCartOpen, removeFromCart, getCartTotal } =
        useCartStore();

    const cartTotal = getCartTotal();
    const isEmpty = cart.length === 0;

    const handleCheckout = () => {
        setCartOpen(false);
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        setCartOpen(false);
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Giỏ hàng ({cart.length})</SheetTitle>
                </SheetHeader>

                {isEmpty ? (
                    /* Empty State */
                    <div className="flex-1 flex flex-col items-center justify-center p-6">
                        <ShoppingBag className="h-20 w-20 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Giỏ hàng trống
                        </h3>
                        <p className="text-gray-500 text-center mb-6">
                            Bạn chưa có sản phẩm nào trong giỏ hàng
                        </p>
                        <Button onClick={handleContinueShopping}>Khám phá sản phẩm</Button>
                    </div>
                ) : (
                    <>
                        {/* Cart Items (Scrollable) */}
                        <div className="flex-1 overflow-y-auto">
                            {cart.map((item) => (
                                <CartItemCard
                                    key={item.productId}
                                    item={item}
                                    onRemove={() => removeFromCart(item.productId)}
                                />
                            ))}
                        </div>

                        {/* Cart Summary (Sticky Bottom) */}
                        <div className="border-t bg-gray-50 p-4 space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Tạm tính:</span>
                                <span className="font-medium">{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Phí vận chuyển:</span>
                                <span className="text-gray-500">Tính ở bước thanh toán</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between">
                                <span className="font-semibold">Tổng cộng:</span>
                                <span className="text-xl font-bold text-primary">
                                    {formatPrice(cartTotal)}
                                </span>
                            </div>

                            <Button
                                className="w-full h-12"
                                size="lg"
                                onClick={handleCheckout}
                            >
                                Tiến hành thanh toán
                            </Button>

                            <button
                                onClick={handleContinueShopping}
                                className="w-full text-center text-sm text-gray-600 hover:text-primary"
                            >
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
