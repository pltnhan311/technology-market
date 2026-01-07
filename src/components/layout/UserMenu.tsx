import { useNavigate } from 'react-router-dom';
import { Package, User as UserIcon, MapPin, Heart, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface UserMenuProps {
    children: React.ReactNode;
}

export function UserMenu({ children }: UserMenuProps) {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        toast.success('Đã đăng xuất');
        navigate('/');
    };

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
                {/* User Info */}
                <div className="px-4 py-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white font-semibold text-lg">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                            <p className="text-sm text-gray-600 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>

                <DropdownMenuSeparator />

                {/* Menu Items */}
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <Package className="h-4 w-4 mr-3" />
                    Đơn hàng của tôi
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <UserIcon className="h-4 w-4 mr-3" />
                    Thông tin tài khoản
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => navigate('/profile/addresses')}>
                    <MapPin className="h-4 w-4 mr-3" />
                    Địa chỉ giao hàng
                </DropdownMenuItem>

                <DropdownMenuItem disabled className="opacity-50 cursor-not-allowed">
                    <Heart className="h-4 w-4 mr-3" />
                    <span>Sản phẩm yêu thích</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                        Sắp có
                    </Badge>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                    <LogOut className="h-4 w-4 mr-3" />
                    Đăng xuất
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
