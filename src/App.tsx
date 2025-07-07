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
import LoginForm from "./modules/auth/components/LoginForm";
import ProtectedRoute from "./modules/auth/components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />

        <Route element={<Layout />}>
          <Route path="/catalog" element={
            <ProtectedRoute>
              <Catalog />
            </ProtectedRoute>
          } />
          <Route path="/new-product" element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          } />
          <Route path="/product/:productId" element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          } />
          <Route path="/product/edit/:productId" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
