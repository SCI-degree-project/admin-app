import React, { useState } from "react";
import ConfirmPopup from "../../core/components/ConfirmPopup";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

type ProductCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  imageUrl,
  onEdit,
  onDelete,
  onClick
}) => {
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
      <div className="group bg-white rounded-xl shadow-sm overflow-hidden w-full max-w-xs mx-auto border border-gray-200">
        <div className="relative">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-56 object-cover opacity-80"
            onClick={onClick}
          />
          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={onEdit}
              className="bg-white rounded-full p-1 shadow hover:bg-gray-100"
              title="Edit"
            >
              <PencilIcon className="h-4 w-4 text-gray-700" />
            </button>
            <button
              onClick={handleDelete}
              className="bg-white rounded-full p-1 shadow hover:bg-gray-100"
              title="Delete"
            >
              <TrashIcon className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="px-4 py-3 text-center">
          <h3 className="text-base font-semibold text-gray-800">{name}</h3>
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
