import { useState } from "react";
import { deleteProduct } from "../services/productService";

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteProduct = async (tenantId: string, productId: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProduct(tenantId, productId);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteProduct, loading, error };
};
