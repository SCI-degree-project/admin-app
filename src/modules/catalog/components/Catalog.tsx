import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../services/productService";
import { Product } from "../../../domain/Product";
import { useTenant } from "../../../context/TenantContext";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { tenantId } = useTenant();

  useEffect(() => {
    if (!tenantId) return;
    fetchProducts(tenantId)
      .then(setProducts)
      .catch(err => console.error("Error loading catalog:", err));
  }, [tenantId]);

  return (
    <div className="py-8 text-primary px-6 md:px-24">
      <h2 className="text-2xl mb-4">Catalog</h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={`$${product.price.toFixed(2)}`}
            imageUrl={product.gallery?.[0] ?? ""}
          />
        ))}
      </section>
    </div>
  );
};

export { Catalog };
