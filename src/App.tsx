import Login from "./modules/auth/components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./modules/catalog/components/Catalog";
import { NotFound } from "./modules/core/components/NotFound";
import { Layout } from "./modules/core/layouts/Layout";
import ProductForm from "./modules/catalog/components/ProductForm";
import ProductDetails from "./modules/catalog/components/ProductDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/new-product" element={<ProductForm />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
