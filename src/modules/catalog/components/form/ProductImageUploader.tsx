// components/ProductImageUploader.tsx

import React from "react";
import InfoTooltip from "../../../../assets/InfoTooltip";
import ImagePreview from "../ImagePreview";
import { useTranslation } from "react-i18next";

type ProductImageUploaderProps = {
    imageFiles: File[];
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
    imageFiles,
    setImageFiles
}) => {
    const { t } = useTranslation();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(e.target.files || []);
        const remaining = 10 - imageFiles.length;

        const imageOnly = selected.filter((f) => f.type.startsWith("image/"));
        if (imageOnly.length !== selected.length) {
            alert("Only image files are allowed");
            return;
        }

        if (selected.length > remaining) {
            alert(`Only can add ${remaining} image${remaining === 1 ? "" : "s"} more`);
            return;
        }

        setImageFiles((prev) => [...prev, ...imageOnly]);
    };

    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-base font-semibold text-gray-700">{t('new-product.form.images.title')}</label>
                <InfoTooltip>
                    <>
                        Upload one or more images to visually represent your product. High-quality images help users better understand the product.
                        <br /> <br />
                        Supported formats: <strong>JPG, JPEG, PNG, </strong> and <strong>WEBP</strong>.
                    </>
                </InfoTooltip>
                <span className="text-xs text-gray-500">({imageFiles.length}/10)</span>
            </div>

            {imageFiles.length === 0 && (
                <p className="text-sm text-grey-300 mb-2">{t('new-product.form.images.advise')}</p>
            )}

            {imageFiles.length < 10 && (
                <div className="mb-4">
                    <label className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg border-2 border-blue-600 shadow-sm hover:bg-blue-600 hover:text-white cursor-pointer transition">
                        {t('new-product.form.images.action')}
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
            )}

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-2">
                {imageFiles.map((file, idx) => (
                    <ImagePreview
                        key={idx}
                        file={file}
                        onRemove={() => setImageFiles((prev) => prev.filter((_, i) => i !== idx))}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductImageUploader;
