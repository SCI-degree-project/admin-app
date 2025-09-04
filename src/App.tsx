import { Navigate, Route, Routes } from "react-router-dom";
import { Catalog } from "./modules/catalog/pages/Catalog";
import { NotFound } from "./modules/core/components/NotFound";
import { Layout } from "./modules/core/layouts/Layout";
import ProductDetails from "./modules/catalog/pages/ProductDetails";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateProduct from "./modules/catalog/pages/CreateProduct";
import EditProduct from "./modules/catalog/pages/EditProduct";
import { Analytics } from "./modules/analytics/components/Analytics";
import LoginForm from "./modules/auth/components/LoginForm";
import ProtectedRoute from "./modules/auth/components/ProtectedRoute";
import Settings from "./modules/core/components/Settings";
import Support from "./modules/core/components/SupportPage";
import Product3DViewer from "./modules/catalog/pages/Product3DView";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />

        <Route element={<Layout />}>
          <Route path="/products" element={
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
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/support" element={
            <ProtectedRoute>
              <Support />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/product/:productId/3d" element={
          <ProtectedRoute>
            <Product3DViewer />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
