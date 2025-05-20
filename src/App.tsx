import Login from "./modules/auth/components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./modules/catalog/components/Catalog";
import { NotFound } from "./modules/core/components/NotFound";
import { Layout } from "./modules/core/layouts/Layout";
import ProductForm from "./modules/catalog/components/ProductForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/catalog" />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product-form" element={<ProductForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
