import { useEffect, useRef, useState, useCallback } from "react";
import ProductCard from "./ProductCard";
import { fetchProductsPaginated, searchProducts } from "../services/productService";
import { useTenant } from "../../../context/TenantContext";
import { NotFound } from "../../core/components/NotFound";
import { ProductPreview } from "../../../domain/ProductPreview";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import SearchInput from "./SearchInput";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Catalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { tenantId } = useTenant();
  const loaderRef = useRef<HTMLDivElement>(null);

  const { handleDeleteProduct } = useDeleteProduct();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const loadMore = useCallback(async () => {
    if (!tenantId || loading || !hasMore) return;

    setLoading(true);
    try {
      const { content, last } = await fetchProductsPaginated(tenantId, page);
      if (!Array.isArray(content)) throw new Error("Error");

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

  useEffect(() => {
    if (!tenantId) return;

    const fetchResults = async () => {
      if (searchTerm.trim() === "") return;
      if (debouncedSearchTerm.trim()) {
        try {
          const result = await searchProducts({ tenantId, name: debouncedSearchTerm });
          setProducts(result.content);
          setHasMore(false);
        } catch (err) {
          console.error("Search error:", err);
        }
      }
    };

    fetchResults();
  }, [debouncedSearchTerm, tenantId]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setProducts([]);
      setPage(0);
      setHasMore(true);
      loadMore();
    }
  }, [searchTerm]);

  const handleDelete = async (productId: string) => {
    if (!tenantId) return;

    try {
      await handleDeleteProduct(tenantId, productId);
      toast.success("Product deleted successfully");
      
      setProducts([]);
      setPage(0);
      setHasMore(true);
      loadMore();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (error) return <NotFound />;

  return (
    <div className="py-8 text-primary px-6 md:px-24">
      <h2 className="text-2xl mb-4">Catalog</h2>

      <div className="flex items-center gap-4 mb-4">
        <SearchInput value={searchTerm} onChange={setSearchTerm} />
      </div>

      {products.length === 0 && !loading && (
        <p className="text-center text-gray-500 mt-8">No products.</p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.cover}
            onDelete={() => handleDelete(product.id)}
            onClick={() => navigate(`/product/${product.id}`)}
          />
        ))}
      </section>

      {loading && <p className="text-center mt-4 text-gray-500">Loading...</p>}
      <div ref={loaderRef} className="h-1" />
    </div>
  );
};

export { Catalog };
