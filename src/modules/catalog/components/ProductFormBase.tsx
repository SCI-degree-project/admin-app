import React, { useState } from "react";
import { materialOptions } from "../../../domain/Material";
import { styleOptions, Style } from "../../../domain/Style";
import InfoTooltip from "../../../assets/InfoTooltip";
import Model3DUploadPopup from "./Model3DUploadPopup";
import ImagePreview from "./ImagePreview";
import { useTranslation } from 'react-i18next';

type ProductFormBaseProps = {
    initialData?: {
        name?: string;
        description?: string;
        price?: number;
        materials?: string[];
        style?: string;
        width?: number;
        height?: number;
        depth?: number;
        gallery?: File[];
        modelFile?: File | null;
    };
    actionName?: string;
    onSubmit: (formData: FormData) => void;
    isSubmitting?: boolean;
    error?: string | null;
};

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

    const [width, setWidth] = useState(initialData?.width?.toString() ?? "");
    const [height, setHeight] = useState(initialData?.height?.toString() ?? "");
    const [depth, setDepth] = useState(initialData?.depth?.toString() ?? "");

    const [imageFiles, setImageFiles] = useState<File[]>(initialData?.gallery ?? []);
    const [modelFile, setModelFile] = useState<File | null>(initialData?.modelFile ?? null);
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

        if (width !== initialData?.width?.toString()) formData.append("width", width);
        if (height !== initialData?.height?.toString()) formData.append("height", height);
        if (depth !== initialData?.depth?.toString()) formData.append("depth", depth);

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

                    <div>
                        <label className="block text-base font-semibold text-gray-700 mb-1">
                            {t('new-product.form.dimensions')}
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <input
                                    type="number"
                                    placeholder="Width"
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                    className="border p-2 rounded-xl w-full border-gray-400"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Height"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="border p-2 rounded-xl w-full border-gray-400"
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Depth"
                                    value={depth}
                                    onChange={(e) => setDepth(e.target.value)}
                                    className="border p-2 rounded-xl w-full border-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2">{t('new-product.form.materials')}</label>
                        <div className="grid grid-cols-2 gap-2">
                            {materialOptions.map(material => (
                                <label key={material} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={materials.includes(material)}
                                        onChange={() =>
                                            setMaterials(prev =>
                                                prev.includes(material)
                                                    ? prev.filter(m => m !== material)
                                                    : [...prev, material]
                                            )
                                        }
                                    />
                                    <span className="text-sm">{t(`materials.${material}`)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

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
                                        onChange={(e) => {
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
                                        }}
                                    />
                                </label>
                            </div>
                        )}

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-2">
                            {imageFiles.map((file, idx) => (
                                <ImagePreview
                                    key={file.name + idx}
                                    file={file}
                                    onRemove={() => setImageFiles((prev) => prev.filter((_, i) => i !== idx))}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <label className="block text-base font-semibold text-gray-700">{t('new-product.form.3d-model.title')}</label>
                            <InfoTooltip>
                                <>
                                    Attach a 3D model to allow users to view the product interactively in 360° or AR. Use this to enhance product visualization and engagement.
                                    <br /> <br />
                                    Supported format: <strong>GLB</strong>.
                                </>
                            </InfoTooltip>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowModelPopup(true)}
                            className={`px-4 py-2 rounded-lg transition ${modelFile
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                                }`}
                            disabled={!!modelFile}
                        >
                            {t('new-product.form.3d-model.action')}
                        </button>

                        {modelFile && (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-sm text-gray-800">
                                    {modelFile.name}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setModelFile(null)}
                                    className="text-gray-500 hover:text-red-500 text-sm"
                                    title="Remove 3D model"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
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
