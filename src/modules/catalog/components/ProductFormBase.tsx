import React, { useState } from "react";
import { styleOptions, Style } from "../../../domain/Style";
import Model3DUploadPopup from "./Model3DUploadPopup";
import { useTranslation } from 'react-i18next';
import ProductImageUploader from "./form/ProductImageUploader";
import Product3DModelUploader from "./form/Product3DModelUploader";
import ProductDimensionsInput from "./form/ProductDimensionsInput";
import { ProductFormBaseProps } from "./form/ProductFormBaseProps";
import ProductMaterialsSelector from "./form/ProductMaterialsSelector";

const ProductFormBase: React.FC<ProductFormBaseProps> = ({
    initialData,
    actionName,
    onSubmit,
    isSubmitting,
    error,
}) => {
    const [name, setName] = useState(initialData?.name ?? "");
    const [description, setDescription] = useState(initialData?.description ?? "");
    const [price, setPrice] = useState(initialData?.price?.toString() ?? "");
    const [materials, setMaterials] = useState<string[]>(initialData?.materials ?? []);
    const [style, setStyle] = useState<string>(initialData?.style ?? "MODERN");

    const [width, setWidth] = useState(initialData?.dimensions?.width?.toString() ?? "");
    const [height, setHeight] = useState(initialData?.dimensions?.height?.toString() ?? "");
    const [depth, setDepth] = useState(initialData?.dimensions?.depth?.toString() ?? "");

    const [imageFiles, setImageFiles] = useState<File[]>(initialData?.media?.gallery?.map((img) => img.imageUrl) ?? []);
    const [modelFile, setModelFile] = useState<File | null>(initialData?.media?.model ?? null);
    const [showModelPopup, setShowModelPopup] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        if (!validateForm()) return;
        e.preventDefault();

        const formData = new FormData();

        if (name !== initialData?.name) formData.append("name", name);
        if (description !== initialData?.description) formData.append("description", description);
        if (price !== initialData?.price?.toString()) formData.append("price", price);
        if (style !== initialData?.style) formData.append("style", style);

        const dimensions = {
            width: parseFloat(width) || 0,
            height: parseFloat(height) || 0,
            depth: parseFloat(depth) || 0,
        };

        Object.keys(dimensions).forEach((key) => {
            if (dimensions[key as keyof typeof dimensions] === 0) {
                delete dimensions[key as keyof typeof dimensions];
            }
        });

        if (Object.keys(dimensions).length > 0) {
            formData.append("dimensions", JSON.stringify(dimensions));
        }

        const originalMaterials = initialData?.materials ?? [];
        const materialsChanged =
            materials.length !== originalMaterials.length ||
            materials.some((m) => !originalMaterials.includes(m));
        if (materialsChanged) {
            materials.forEach((m) => formData.append("materials", m));
        }

        imageFiles.forEach((f) => formData.append("gallery", f));

        if (modelFile) {
            formData.append("model", modelFile);
        }

        try {
            onSubmit(formData);
        } catch (e) {
            console.error("Error submitting form:", e);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: boolean } = {};

        if (!name.trim()) newErrors.name = true;
        if (!price.trim()) newErrors.price = true;
        if (materials.length === 0) newErrors.materials = true;
        if (!width.trim()) newErrors.width = true;
        if (!height.trim()) newErrors.height = true;
        if (!depth.trim()) newErrors.depth = true;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-semibold text-gray-700">{t('new-product.form.name')}</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className={`border p-2 rounded-xl w-full ${errors.name ? "border-red-500" : "border-gray-400"}`}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">{t('new-product.form.description')}</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className="border p-2 rounded-xl w-full border-gray-400"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">{t('new-product.form.price')}</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            step="0.01"
                            required
                            className={`border p-2 rounded-xl w-full ${errors.name ? "border-red-500" : "border-gray-400"}`}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">{t('new-product.form.style')}</label>
                        <select
                            value={style}
                            onChange={e => setStyle(e.target.value as Style)}
                            className="border p-2 rounded-xl w-full border-gray-400"
                        >
                            {styleOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>

                    <ProductDimensionsInput
                        width={width}
                        height={height}
                        depth={depth}
                        setWidth={setWidth}
                        setHeight={setHeight}
                        setDepth={setDepth}
                        errors={errors}
                    />

                </div>

                <div className="space-y-4">
                    <ProductMaterialsSelector
                        selectedMaterials={materials}
                        setSelectedMaterials={setMaterials}
                        error={errors.materials}
                    />

                    <ProductImageUploader imageFiles={imageFiles} setImageFiles={setImageFiles} />

                    <Product3DModelUploader modelFile={modelFile} setModelFile={setModelFile} />
                </div>

                {showModelPopup && (
                    <Model3DUploadPopup
                        onClose={() => setShowModelPopup(false)}
                        onSelectExisting={(file) => {
                            setModelFile(file);
                            setShowModelPopup(false);
                        }}
                        onCreateNew={() => {
                            setShowModelPopup(false);
                        }}
                    />
                )}
            </form>

            <div className="flex justify-center mt-6 pt-4">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        actionName
                    )}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default ProductFormBase;
