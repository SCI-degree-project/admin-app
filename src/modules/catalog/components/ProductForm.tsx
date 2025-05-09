import React, { useState } from "react";
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useTenant } from "../../../context/TenantContext";

type Material = "PINE_WOOD" | "METAL" | "PLASTIC" | "LEATHER";
type Style = "MODERN" | "TRADITIONAL" | "INDUSTRIAL" | "SCANDINAVIAN";

const materialOptions: Material[] = ["PINE_WOOD", "METAL", "PLASTIC", "LEATHER"];
const styleOptions: Style[] = ["MODERN", "TRADITIONAL", "INDUSTRIAL", "SCANDINAVIAN"];

const ProductForm: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [materials, setMaterials] = useState<Material[]>([]);
    const [style, setStyle] = useState<Style>("MODERN");
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    const { tenantId } = useTenant();
    const { createProduct, loading, error } = useCreateProduct();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!tenantId) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("style", style);
        formData.append("tenantId", tenantId);
        materials.forEach(m => formData.append("materials", m));
        imageFiles.forEach(file => formData.append("images", file));

        try {
            await createProduct(formData, tenantId);
            setName("");
            setDescription("");
            setPrice("");
            setMaterials([]);
            setStyle("MODERN");
            setImageFiles([]);
        } catch (err) {
            console.error("Error creating product:", err);
        }
    };

    return (
        <div className="w-full mx-auto mt-2 p-8 bg-white">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Add new Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Images</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        />
                        <div className="flex flex-wrap gap-4 mt-2">
                            {imageFiles.map((file, idx) => (
                                <div key={idx} className="relative w-24 h-24 border rounded-lg overflow-hidden shadow-sm">
                                    <img src={URL.createObjectURL(file)} alt={`preview-${idx}`} className="object-cover w-full h-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Materials</label>
                        <div className="grid grid-cols-2 gap-2">
                            {materialOptions.map((material) => (
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
                        <label className="block text-sm font-semibold text-gray-700">Style</label>
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

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
