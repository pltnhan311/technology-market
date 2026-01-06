import { Button } from '@/components/ui/button';

export function HeroSection() {
    return (
        <section className="relative h-[400px] md:h-[500px] bg-gradient-to-br from-primary via-blue-600 to-blue-800 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            {/* Content */}
            <div className="container relative mx-auto max-w-7xl h-full flex items-center px-4">
                <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Đồ công nghệ chính hãng, giá tốt
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-8">
                        Laptop, PC, điện thoại và phụ kiện gaming chất lượng cao. Bảo hành 12 tháng. Giao hàng toàn quốc.
                    </p>
                    <div className="flex gap-4">
                        <Button size="lg" variant="secondary" className="text-base">
                            Khám phá ngay
                        </Button>
                        <Button size="lg" variant="outline" className="text-base bg-white hover:bg-gray-100">
                            Xem ưu đãi
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        </section>
    );
}
