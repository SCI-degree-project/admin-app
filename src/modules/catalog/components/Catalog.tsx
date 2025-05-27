import { useEffect, useRef, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { fetchProductsPaginated } from "../services/productService";
import { useTenant } from "../../../context/TenantContext";
import { NotFound } from "../../core/components/NotFound";
import { ProductPreview } from "../../../domain/ProductPreview";
import { useDeleteProduct } from "../hooks/useDeleteProduct";

const PAGE_SIZE = 20;

const Catalog = () => {
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { tenantId } = useTenant();
  const loaderRef = useRef<HTMLDivElement>(null);

  const { handleDeleteProduct } = useDeleteProduct(products, setProducts);

  const loadMore = useCallback(async () => {
    if (!tenantId || loading || !hasMore) return;
  
    setLoading(true);
    try {
      const { content, last } = await fetchProductsPaginated(tenantId, page, PAGE_SIZE);
  
      if (!Array.isArray(content)) throw new Error("Respuesta inesperada");
  
      setProducts((prev) => [...prev, ...content]);
      setHasMore(!last);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [tenantId, page, loading, hasMore]);  

  useEffect(() => {
    if (tenantId) {
      loadMore();
    }
  }, [tenantId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMore]);

  if (error) return <NotFound />;

  return (
    <div className="py-8 text-primary px-6 md:px-24">
      <h2 className="text-2xl mb-4">Catalog</h2>

      {products.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-8">No hay productos disponibles.</p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
          key={product.id}
          name={product.name}
          imageUrl={product.cover}
          onDelete={() => {
              if (tenantId) handleDeleteProduct(tenantId, product.id);
            }}
        />        
        ))}
      </section>

      {loading && <p className="text-center mt-4 text-gray-500">Cargando más productos...</p>}
      <div ref={loaderRef} className="h-1" />
    </div>
  );
};

export { Catalog };
