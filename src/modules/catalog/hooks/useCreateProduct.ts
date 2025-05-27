import { useState } from 'react';
import { createProduct } from '../services/productService';

export const useCreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProduct = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    try {
      const product = await createProduct(formData);
      return product;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct: handleCreateProduct, loading, error };
};
