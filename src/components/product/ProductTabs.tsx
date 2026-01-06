import { Product } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductTabsProps {
    product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
    const specsEntries = Object.entries(product.specs);

    return (
        <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Mô tả</TabsTrigger>
                <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
                <TabsTrigger value="reviews">
                    Đánh giá ({product.reviewCount})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                    <div className="text-gray-700 leading-relaxed space-y-4">
                        <p>{product.description}</p>
                        <div className="mt-4 space-y-2">
                            <h3 className="font-semibold text-lg">Thông tin chi tiết</h3>
                            <p>
                                {product.name} là sản phẩm chất lượng cao từ thương hiệu {product.brand}.
                                Sản phẩm được thiết kế đáp ứng nhu cầu của người dùng với hiệu năng
                                vượt trội và độ bền cao.
                            </p>
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
                <Accordion type="single" collapsible className="w-full">
                    {specsEntries.map(([key, value], index) => (
                        <AccordionItem key={key} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                                <span className="font-medium">{key}</span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="text-gray-700">{value}</div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">
                        Tính năng đánh giá sẽ có trong phiên bản tiếp theo
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Hiện tại sản phẩm có {product.reviewCount} đánh giá với điểm trung bình{' '}
                        {product.rating.toFixed(1)}/5.0
                    </p>
                </div>
            </TabsContent>
        </Tabs>
    );
}
