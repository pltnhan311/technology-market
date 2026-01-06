import { Facebook, Instagram, Twitter, CreditCard } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 mt-16">
            <div className="container mx-auto max-w-7xl px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* Column 1: About */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Về TechZone</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Cửa hàng công nghệ uy tín, chuyên cung cấp laptop, PC, điện thoại và phụ kiện chính hãng với giá tốt nhất thị trường.
                        </p>
                        <div className="mt-4">
                            <p className="text-sm text-gray-600">Hotline: 1900 xxxx</p>
                            <p className="text-sm text-gray-600">Email: support@techzone.vn</p>
                        </div>
                    </div>

                    {/* Column 2: Policies */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Chính sách</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Chính sách bảo hành
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Chính sách vận chuyển
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Chính sách đổi trả
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Chính sách bảo mật
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Điều khoản sử dụng
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Liên hệ</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Địa chỉ: 123 Đường ABC, Quận XYZ, TP. Hồ Chí Minh
                        </p>
                        <p className="text-sm text-gray-600 mb-4">Giờ làm việc: 8:00 - 22:00 hàng ngày</p>
                        <div className="flex space-x-4 mt-4">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                            >
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                            >
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-primary hover:text-white transition-colors"
                            >
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 border-t pt-8">
                    <p className="text-sm text-gray-600 mb-3">Phương thức thanh toán:</p>
                    <div className="flex flex-wrap gap-3">
                        <div className="flex h-10 items-center rounded border bg-white px-3">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">COD</span>
                        </div>
                        <div className="flex h-10 items-center rounded border bg-white px-3">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">Chuyển khoản</span>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t pt-8 text-center">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} TechZone. Tất cả quyền được bảo lưu.
                    </p>
                </div>
            </div>
        </footer>
    );
}
