import { useState } from "react";
import { searchProducts } from "../services/productService";
import { ProductPreview } from "../../../domain/ProductPreview";

export const useSearchProduct = () => {
  const [results, setResults] = useState<ProductPreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async ({
    tenantId,
    name,
    sortBy,
    direction,
    page,
    size,
  }: {
    tenantId: string;
    name?: string;
    sortBy?: string;
    direction?: string;
    page?: number;
    size?: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await searchProducts({
        tenantId,
        name,
        sortBy,
        direction,
        page,
        size,
      });
      setResults(res.content);
      return res;
    } catch (err: any) {
      console.error("Search error:", err);
      setError("Failed to search products");
    } finally {
      setLoading(false);
    }
  };

  return { results, search: handleSearch, loading, error };
};
