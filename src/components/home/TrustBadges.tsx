import { ShieldCheck, Clock, Truck } from 'lucide-react';

const badges = [
    {
        icon: ShieldCheck,
        title: 'Chính hãng 100%',
        description: 'Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng',
    },
    {
        icon: Clock,
        title: 'Bảo hành 12 tháng',
        description: 'Bảo hành chính hãng, hỗ trợ tận tình',
    },
    {
        icon: Truck,
        title: 'Giao hàng toàn quốc',
        description: 'Giao hàng nhanh chóng, thanh toán linh hoạt',
    },
];

export function TrustBadges() {
    return (
        <section className="container mx-auto max-w-7xl px-4 py-12 md:py-16 bg-primary/5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {badges.map((badge, index) => {
                    const IconComponent = badge.icon;
                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <IconComponent className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {badge.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {badge.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
