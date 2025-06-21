import React, { useState } from "react";
import { materialOptions } from "../../../domain/Material";
import { styleOptions, Style } from "../../../domain/Style";
import InfoTooltip from "../../../assets/InfoTooltip";
import Model3DUploadPopup from "./Model3DUploadPopup";
import ImagePreview from "./ImagePreview";

type ProductFormBaseProps = {
    initialData?: {
        name?: string;
        description?: string;
        price?: number;
        materials?: string[];
        style?: string;
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
    const [imageFiles, setImageFiles] = useState<File[]>(initialData?.gallery ?? []);
    const [modelFile, setModelFile] = useState<File | null>(initialData?.modelFile ?? null);
    const [showModelPopup, setShowModelPopup] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        if (name !== initialData?.name) formData.append("name", name);
        if (description !== initialData?.description) formData.append("description", description);
        if (price !== initialData?.price?.toString()) formData.append("price", price);
        if (style !== initialData?.style) formData.append("style", style);

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

    return (
        <div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-semibold text-gray-700">Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            rows={3}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">Price *</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            step="0.01"
                            required
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">Style</label>
                        <select
                            value={style}
                            onChange={e => setStyle(e.target.value as Style)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        >
                            {styleOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2">Materials *</label>
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
                                    <span className="text-sm">{material}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <label className="block text-base font-semibold text-gray-700">Images</label>
                            <InfoTooltip>
                                <>
                                    Upload one or more images to visually represent your product. High-quality images help users better understand the product.
                                    <br /> <br />
                                    Supported formats: <strong>JPG, JPEG, PNG, </strong> and <strong>WEBP</strong> .
                                </>
                            </InfoTooltip>
                            <span className="text-xs text-gray-500">({imageFiles.length}/10)</span>
                        </div>

                        {imageFiles.length === 0 && (
                            <p className="text-sm text-grey-300 mb-2">Add the cover image first.</p>
                        )}

                        {imageFiles.length < 10 && (
                            <div className="mb-4">
                                <label className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg border-2 border-blue-600 shadow-sm hover:bg-blue-600 hover:text-white cursor-pointer transition">
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v16h16V4H4zM8 11h8m-4-4v8" />
                                    </svg>
                                    Add Images
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
                            <label className="block text-base font-semibold text-gray-700">3D Model</label>
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
                            Add 3D Model
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
                            // TODO: Navigate to AR modeling screen if applicable
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
