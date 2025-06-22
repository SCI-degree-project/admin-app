import { useState } from "react";
import { patchProduct } from "../services/productService";

export const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (
    data: FormData,
    tenantId: string,
    productId: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      await patchProduct(data, tenantId, productId);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateProduct, loading, error };
};
