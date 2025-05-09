import React, { useState } from "react";
import ConfirmPopup from "../../core/components/ConfirmPopup";

type ProductCardProps = {
    imageUrl: string;
    name: string;
    price: string;
    onEdit?: () => void;
    onDelete?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, name, price, onEdit, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        setShowConfirm(false);
        onDelete?.();
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden w-full max-w-xs mx-auto hover:shadow-md transition-shadow duration-300 min-w-[12rem]">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-56 object-cover"
                />
                <div className="p-4 text-left">
                    <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-900 mt-2">{price}</p>

                    <div className="flex gap-2 mt-4">
                        <button
                            onClick={onEdit}
                            className="w-full py-2 text-sm text-yellow-500 rounded border border-yellow-500 hover:bg-yellow-500 hover:text-white transition duration-200"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-full py-2 text-sm text-red-600 rounded border border-red-600 hover:bg-red-600 hover:text-white transition duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmPopup
                isOpen={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message={`Are you sure you want to delete "${name}"?`}
            />
        </>
    );
};

export default ProductCard;
