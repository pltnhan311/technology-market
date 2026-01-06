import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [zoomModalOpen, setZoomModalOpen] = useState(false);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setZoomModalOpen(true)}
            >
                <img
                    src={images[selectedImage]}
                    alt={productName}
                    className="w-full h-full object-cover"
                />
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-2 py-1 rounded">
                        {selectedImage + 1}/{images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                    ? 'border-primary'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Zoom Modal */}
            <Dialog open={zoomModalOpen} onOpenChange={setZoomModalOpen}>
                <DialogContent className="max-w-4xl">
                    <img
                        src={images[selectedImage]}
                        alt={productName}
                        className="w-full h-auto"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
