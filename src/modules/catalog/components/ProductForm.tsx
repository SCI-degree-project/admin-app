import React, { useState } from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useTenant } from "../../../context/TenantContext";
import { materialOptions, Material } from "../../../domain/Material";
import { styleOptions, Style } from "../../../domain/Style";
import ImagePreview from "./ImagePreview";
import Model3DUploadPopup from "./Model3DUploadPopup";
import InfoTooltip from "../../../assets/InfoTooltip";
import { toast } from "react-toastify";


const ProductForm: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [materials, setMaterials] = useState<Material[]>([]);
    const [style, setStyle] = useState<Style>("MODERN");
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [showModelPopup, setShowModelPopup] = useState(false);
    const [modelFile, setModelFile] = useState<File | null>(null);

    const { tenantId } = useTenant();
    const { createProduct, loading, error } = useCreateProduct();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantId) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        materials.forEach((m) => formData.append("materials", m));
        formData.append("style", style);
        formData.append("tenantId", tenantId);
        imageFiles.forEach((file) => formData.append("gallery", file));
        if (modelFile) {
            formData.append("model", modelFile);
        }

        for (const [key, val] of formData.entries()) {
            console.log(key, val);
        }

        try {
            await createProduct(formData);
            toast.success("Product created successfully");
            setName("");
            setDescription("");
            setPrice("");
            setMaterials([]);
            setStyle("MODERN");
            setImageFiles([]);
            setModelFile(null);
        } catch (err) {
            console.error("Error creating product:", err);
        }
    };

    return (
        <div className="w-full mx-auto mt-2 px-4 sm:px-4 md:px-12 lg:px-24 py-8 bg-white">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Add new Product</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-base font-semibold text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                            step="0.01"
                            required
                        />
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            {imageFiles.map((file, idx) => (
                                <ImagePreview
                                    key={file.name + idx}
                                    file={file}
                                    onRemove={() => setImageFiles((prev) => prev.filter((_, i) => i !== idx))}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-base font-semibold text-gray-700 mb-2">Materials</label>
                        <div className="grid grid-cols-2 gap-2">
                            {materialOptions.map((material) => (
                                <label key={material} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={materials.includes(material)}
                                        onChange={() =>
                                            setMaterials((prev) =>
                                                prev.includes(material)
                                                    ? prev.filter((m) => m !== material)
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
                        <label className="block text-base font-semibold text-gray-700">Style</label>
                        <select
                            value={style}
                            onChange={(e) => setStyle(e.target.value as Style)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        >
                            {styleOptions.map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt}
                                </option>
                            ))}
                        </select>
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
            </form>

            <div className="flex justify-center mt-6 pt-4">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    {loading ? "Saving..." : "Save Product"}
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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

        </div>
    );
};

export default ProductForm;
