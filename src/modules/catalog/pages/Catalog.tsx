import { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProductsPaginated, searchProducts } from "../services/productService";
import { useTenant } from "../../../context/TenantContext";
import { NotFound } from "../../core/components/NotFound";
import { ProductPreview } from "../../../domain/ProductPreview";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "use-debounce";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { useTranslation } from 'react-i18next';

const Catalog = () => {
  const navigate = useNavigate();
  const { tenantId } = useTenant();
  const { handleDeleteProduct } = useDeleteProduct();
  const { t } = useTranslation();

  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchData = useCallback(async (pageToLoad: number, search = "") => {
    if (!tenantId) return;

    setLoading(true);
    setError(false);

    try {
      const result = search.trim()
        ? await searchProducts({ tenantId, name: search, page: pageToLoad })
        : await fetchProductsPaginated(tenantId, pageToLoad);

      setProducts(result.content);
      setTotalPages(result.totalPages);
      setCurrentPage(pageToLoad);
    } catch (err) {
      console.error("Error loading products:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [tenantId]);

  const onSearchChange = (term: string) => {
    setSearchTerm(term);
    fetchData(0, term);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage !== currentPage) {
      fetchData(newPage, debouncedSearchTerm);
    }
  };


  useEffect(() => {
    fetchData(currentPage, debouncedSearchTerm);
  }, [currentPage, debouncedSearchTerm, tenantId]);

  const handleDelete = async (productId: string) => {
    if (!tenantId) return;

    try {
      await handleDeleteProduct(tenantId, productId);
      toast.success("Product deleted successfully");
      fetchData(currentPage, debouncedSearchTerm);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (error) return <NotFound />;

  return (
    <div className="py-4 text-primary px-6 md:px-8">
      <h2 className="text-2xl mb-4">{t('products.title')}</h2>

      <div className="flex items-center gap-4 mb-4">
        <SearchInput value={searchTerm} onChange={onSearchChange} />
      </div>

      <section className="min-h-[200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-full h-60 bg-gray-100 animate-pulse rounded-xl" />
          ))
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.cover}
              onDelete={() => handleDelete(product.id)}
              onClick={() => navigate(`/product/${product.id}`)}
              onEdit={() => navigate(`/product/edit/${product.id}`)}
            />
          ))
        )}
      </section>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 items-center flex-wrap">
          <div className="w-9 h-9 flex items-center justify-center">
            {currentPage > 0 ? (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="w-9 h-9 flex items-center justify-center"
              >
                <ArrowLongLeftIcon className="w-5 h-5 text-black" />
              </button>
            ) : (
              <div className="w-9 h-9" />
            )}
          </div>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                onClick={() => handlePageChange(idx)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border 
            ${idx === currentPage ? "bg-black text-white" : "bg-white text-black border-black"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <div className="w-9 h-9 flex items-center justify-center">
            {currentPage < totalPages - 1 ? (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-9 h-9 flex items-center justify-center"
              >
                <ArrowLongRightIcon className="w-5 h-5 text-black" />
              </button>
            ) : (
              <div className="w-9 h-9" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export { Catalog };
