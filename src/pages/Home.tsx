import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

type Product = {
  id: number;
  imageUrl: string;
  name: string;
  materials: string;
  price: string;
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Algodón",
        price: "$25.00",
      },
      {
        id: 2,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Nylon",
        price: "$29.95",
      },
      {
        id: 3,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Seda",
        price: "$50.00",
      },
      {
        id: 4,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Lino",
        price: "$19.99",
      },
      {
        id: 5,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Poliéster",
        price: "$42.75",
      },
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Nylon",
        price: "$29.95",
      },
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Nylon",
        price: "$29.95",
      },
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Nylon",
        price: "$29.95",
      },
      {
        id: 6,
        imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Producto",
        materials: "Nylon",
        price: "$29.95",
      },
    ]);
    // fetch("")
    //   .then(res => res.json())
    //   .then(data => setProducts(data))
    //   .catch(err => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="py-8 text-primary px-6 md:px-24">
      <h2 className="text-2xl mb-4">Catalog</h2>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
          />
        ))}
      </section>
    </div>
  );
}

export { Home };
