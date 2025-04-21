import React, { useState } from "react";

type Material = "WOOD" | "METAL" | "PLASTIC" | "LEATHER";
type Style = "MODERN" | "CLASSIC" | "INDUSTRIAL" | "SCANDINAVIAN";

const materialOptions: Material[] = ["WOOD", "METAL", "PLASTIC", "LEATHER"];
const styleOptions: Style[] = ["MODERN", "CLASSIC", "INDUSTRIAL", "SCANDINAVIAN"];

const ProductForm: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [imageGalleryUrl, setImageGalleryUrl] = useState<string[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [style, setStyle] = useState<Style>("MODERN");
    const [currentUrl, setCurrentUrl] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            coverImageUrl,
            imageGalleryUrl,
            materials,
            style,
        };

        console.log("New product", newProduct);
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
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            step="0.01"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Cover Image URL</label>
                        <input
                            type="text"
                            value={coverImageUrl}
                            onChange={e => setCoverImageUrl(e.target.value)}
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://exampledb.com/imagen.jpg"
                            required
                        />
                        {coverImageUrl && (
                            <div className="mt-2 w-24 h-24 border rounded-lg overflow-hidden shadow-sm">
                                <img src={coverImageUrl} alt="Cover" className="object-cover w-full h-full" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image Gallery (URLs)</label>
                        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mb-4">
                            <input
                                type="text"
                                value={currentUrl}
                                onChange={e => setCurrentUrl(e.target.value)}
                                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://exampledb.com/imagen.jpg"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentUrl && !imageGalleryUrl.includes(currentUrl)) {
                                        setImageGalleryUrl([...imageGalleryUrl, currentUrl]);
                                        setCurrentUrl("");
                                    }
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Añadir
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {imageGalleryUrl.map((url, index) => (
                                <div
                                    key={index}
                                    className="relative w-24 h-24 border rounded-lg overflow-hidden shadow-sm"
                                >
                                    <img src={url} alt={`Galería ${index}`} className="object-cover w-full h-full" />
                                    <button
                                        type="button"
                                        onClick={() => setImageGalleryUrl(imageGalleryUrl.filter((_, i) => i !== index))}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-bl px-1 text-xs hover:bg-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Materials</label>
                        <div className="grid grid-cols-2 gap-2">
                            {materialOptions.map((material) => (
                                <label
                                    key={material}
                                    className="flex items-center space-x-2 cursor-pointer bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition"
                                >
                                    <input
                                        type="checkbox"
                                        checked={materials.includes(material)}
                                        onChange={() => {
                                            setMaterials((prev) =>
                                                prev.includes(material)
                                                    ? prev.filter((m) => m !== material)
                                                    : [...prev, material]
                                            );
                                        }}
                                    />
                                    <span className="text-sm text-gray-800">{material}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Style</label>
                        <select
                            value={style}
                            onChange={e => setStyle(e.target.value as Style)}
                            className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {styleOptions.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Product
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
