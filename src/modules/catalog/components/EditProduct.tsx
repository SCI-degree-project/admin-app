import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useTenant } from "../../../context/TenantContext";
import { Product } from "../../../domain/Product";
import ProductFormBase from "./ProductFormBase";
import { toast } from "react-toastify";
import { useUpdateProduct } from "../hooks/useUpdateProduct";

const EditProduct: React.FC = () => {
  const { productId } = useParams();
  const { tenantId } = useTenant();
  const { updateProduct, loading } = useUpdateProduct();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    getProductById(productId)
      .then(setProduct)
      .catch(() => setError("Failed to load product"))
      .finally(() => setLoading(false));
  }, [productId]);

  const handleSubmit = async (formData: FormData) => {
    if (!tenantId || !productId) return;

    setSubmitting(true);
    try {
      await updateProduct(formData, tenantId, productId);
      toast.success("Product updated successfully");
    } catch (err) {
      console.error("Failed to update product", err);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
      navigate("/products");
    }
  };

  if (productLoading) return <p>Loading...</p>;
  if (error || !product) return <p>{error || "Product not found"}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductFormBase
        initialData={product}
        onSubmit={handleSubmit}
        actionName="Update Product"
        isSubmitting={submitting}
      />
    </div>
  );
};

export default EditProduct;
