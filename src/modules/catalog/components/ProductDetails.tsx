import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { Product } from "../../../domain/Product";
import { useTenant } from "../../../context/TenantContext";
import ProductGallery from "./ProductGallery";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ConfirmPopup from "../../core/components/ConfirmPopup";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { toast } from "react-toastify";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const { tenantId } = useTenant();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const { handleDeleteProduct, loading: deleting } = useDeleteProduct();

  const handleDeleteConfirm = async () => {
    if (!tenantId || !productId) return;
    try {
      await handleDeleteProduct(tenantId, productId);
      toast.success("Product deleted successfully");
      navigate("/products");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    if (!productId) return;
    getProductById(productId)
      .then(setProduct)
      .catch((err) => console.error("Failed to fetch product", err))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
      <div className="md:w-1/2 space-y-4">
        <ProductGallery images={product.gallery} />

        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => navigate(`/product/${product.id}/3d`)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white"
          >
            <EyeIcon className="w-5 h-5" />
            Preview 3D Model
          </button>

          <button
            onClick={() => navigate(`/product/edit/${product.id}`)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-white"
          >
            <PencilSquareIcon className="w-5 h-5" />
            Edit
          </button>

          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
          >
            <TrashIcon className="w-5 h-5" />
            Delete
          </button>
        </div>
      </div>

      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-xl font-semibold text-black-800">BOB {product.price.toFixed(2)}</p>

        <div>
          <h4 className="font-semibold">Materials</h4>
          <ul className="list-disc list-inside text-gray-600">
            {product.materials.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Style</h4>
          <p className="text-gray-600">{product.style}</p>
        </div>
      </div>

      <ConfirmPopup
        isOpen={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Product"
        message={`Are you sure you want to delete "${product?.name}"?`}
      />
    </div>
  );
};

export default ProductDetails;
