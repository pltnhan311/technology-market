import { useState } from 'react';
import { Plus, MapPin, Edit, Trash2, User, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { ShippingAddress } from '@/types';
import { Button } from '@/components/ui/button';
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
import { AddressModal } from '@/components/profile/AddressModal';

export function AddressesPage() {
    const { user, deleteAddress, setDefaultAddress } = useAuthStore();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<ShippingAddress | null>(null);
    const [deletingAddress, setDeletingAddress] = useState<ShippingAddress | null>(null);

    const addresses = user?.addresses || [];

    const handleDelete = async () => {
        if (!deletingAddress) return;

        try {
            await deleteAddress(deletingAddress.id);
            toast.success('Đã xóa địa chỉ');
            setDeletingAddress(null);
        } catch (err: any) {
            toast.error(err.message || 'Có lỗi xảy ra');
        }
    };

    const handleSetDefault = async (id: string) => {
        try {
            await setDefaultAddress(id);
            toast.success('Đã đặt làm địa chỉ mặc định');
        } catch (err: any) {
            toast.error(err.message || 'Có lỗi xảy ra');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Địa chỉ giao hàng
                    </h1>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                        <Plus className="h-5 w-5 mr-2" />
                        Thêm địa chỉ mới
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardContent className="p-0">
                                <nav className="flex flex-col">
                                    <a
                                        href="/profile"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        <User className="h-5 w-5" />
                                        Thông tin cá nhân
                                    </a>
                                    <a
                                        href="/profile/addresses"
                                        className="flex items-center gap-3 px-4 py-3 bg-primary/10 text-primary border-l-4 border-primary font-medium"
                                    >
                                        <MapPin className="h-5 w-5" />
                                        Địa chỉ giao hàng
                                    </a>
                                    <button
                                        disabled
                                        className="flex items-center gap-3 px-4 py-3 text-gray-400 cursor-not-allowed opacity-50"
                                    >
                                        <span className="flex items-center gap-3">
                                            <span>🔒</span>
                                            Đổi mật khẩu
                                        </span>
                                        <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">
                                            Sắp có
                                        </span>
                                    </button>
                                    <a
                                        href="/orders"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                                    >
                                        <ShoppingBag className="h-5 w-5" />
                                        Đơn hàng của tôi
                                    </a>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {addresses.length === 0 ? (
                            /* Empty State */
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                        Chưa có địa chỉ nào
                                    </h3>
                                    <p className="text-gray-600 mb-6">
                                        Thêm địa chỉ để đặt hàng nhanh hơn
                                    </p>
                                    <Button onClick={() => setIsAddModalOpen(true)}>
                                        <Plus className="h-5 w-5 mr-2" />
                                        Thêm địa chỉ mới
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            /* Address Grid */
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {addresses.map((address) => (
                                    <Card key={address.id}>
                                        <CardContent className="p-6 relative">
                                            {address.isDefault && (
                                                <Badge className="absolute top-4 right-4 bg-primary">
                                                    Mặc định
                                                </Badge>
                                            )}
                                            <div className="space-y-2 mb-4">
                                                <p className="font-semibold text-gray-900">
                                                    {address.name}
                                                </p>
                                                <p className="text-sm text-gray-700">{address.phone}</p>
                                                <p className="text-sm text-gray-700">
                                                    {address.address}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {address.district}, {address.city}
                                                </p>
                                            </div>

                                            <div className="flex gap-2 flex-wrap">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setEditingAddress(address)}
                                                >
                                                    <Edit className="h-4 w-4 mr-1" />
                                                    Chỉnh sửa
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setDeletingAddress(address)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4 mr-1" />
                                                    Xóa
                                                </Button>
                                                {!address.isDefault && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleSetDefault(address.id)}
                                                    >
                                                        Đặt làm mặc định
                                                    </Button>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Address Modal */}
            <AddressModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            {/* Edit Address Modal */}
            {editingAddress && (
                <AddressModal
                    isOpen={!!editingAddress}
                    onClose={() => setEditingAddress(null)}
                    address={editingAddress}
                />
            )}

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                open={!!deletingAddress}
                onOpenChange={(open) => !open && setDeletingAddress(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xóa địa chỉ này?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {deletingAddress && (
                                <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                                    <p className="font-medium">{deletingAddress.name}</p>
                                    <p>{deletingAddress.phone}</p>
                                    <p>{deletingAddress.address}</p>
                                    <p>
                                        {deletingAddress.district}, {deletingAddress.city}
                                    </p>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Xóa
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
