import Login from "./modules/auth/components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./modules/catalog/components/Catalog";
import { NotFound } from "./modules/core/components/NotFound";
import { Layout } from "./modules/core/layouts/Layout";
import ProductDetails from "./modules/catalog/components/ProductDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateProduct from "./modules/catalog/components/CreateProduct";
import EditProduct from "./modules/catalog/components/EditProduct";
import { Analytics } from "./modules/analytics/components/Analytics";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/catalog" />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/new-product" element={<CreateProduct />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/product/edit/:productId" element={<EditProduct />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
