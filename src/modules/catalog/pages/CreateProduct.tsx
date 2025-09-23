import React from "react";
import { useTenant } from "../../../context/TenantContext";
import { useCreateProduct } from "../hooks/useCreateProduct";
import ProductFormBase from "../components/ProductFormBase";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';

const CreateProduct: React.FC = () => {
    const { tenantId } = useTenant();
    const { createProduct, loading } = useCreateProduct();
    const { t } = useTranslation();

    const handleSubmit = async (formData: FormData) => {
        if (!tenantId) return;

        formData.append("tenantId", tenantId);

        try {
            await createProduct(formData);
            toast.success("Product created successfully");
        } catch (err) {
            console.error("Failed to create product", err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">{t('new-product.title')}</h2>
            <ProductFormBase
                onSubmit={handleSubmit}
                actionName={t('new-product.action')}
                isSubmitting={loading}
            />
        </div>
    );
};

export default CreateProduct;
