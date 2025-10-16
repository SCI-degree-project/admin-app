import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { GallertItem } from "../../../domain/GalleryItem";

interface ProductGalleryProps {
    images: GallertItem[];
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    useEffect(() => {
        const createdUrls: string[] = [];

        images.forEach(imgItem => {
            if (imgItem.imageUrl instanceof File) {
                const url = URL.createObjectURL(imgItem.imageUrl);
                createdUrls.push(url);
            } else {
                createdUrls.push(imgItem.imageUrl);
            }
        });

        setImageUrls(createdUrls);

        return () => {
            createdUrls.forEach(url => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [images]);

    if (!images.length) {
        return (
            <div className="text-center text-gray-500">No images available.</div>
        );
    }

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[460px]">
                {imageUrls.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-20 h-20 object-cover rounded border cursor-pointer ${i === currentIndex ? "ring-2 ring-black" : ""
                            }`}
                    />
                ))}
            </div>

            <div className="relative w-full max-w-md group">
                <img
                    src={imageUrls[currentIndex]}
                    alt={images[currentIndex].altText || `main-${currentIndex}`}
                    className="w-full h-[400px] object-cover rounded shadow-sm"
                />

                <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                >
                    <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                </button>

                <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
                >
                    <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default ProductGallery;
