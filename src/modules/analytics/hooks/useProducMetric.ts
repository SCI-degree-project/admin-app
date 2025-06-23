import { useEffect, useState } from "react";
import { ProductMetric } from "../models/ProductMetric";
import { getProductMetric } from "../services/metricsService";

export const useProductMetric = (productId: string) => {
  const [data, setData] = useState<ProductMetric | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getProductMetric(productId)
      .then((res) => setData(res))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [productId]);

  return { data, loading, error };
};
