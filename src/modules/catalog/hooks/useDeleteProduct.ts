import { useState } from "react";
import { deleteProduct } from "../services/productService";
import { ProductPreview } from "../../../domain/ProductPreview";

export const useDeleteProduct = (
  products: ProductPreview[],
  setProducts: (products: ProductPreview[]) => void
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteProduct = async (tenantId: string, productId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(tenantId, productId);
      setProducts(products.filter(p => p.id !== productId));
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteProduct, loading, error };
};
