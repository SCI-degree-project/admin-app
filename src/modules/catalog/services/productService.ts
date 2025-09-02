import axios from 'axios';
import { Product } from '../../../domain/Product';
import { ProductPreview } from '../../../domain/ProductPreview';
import { SearchProductParams } from '../../../domain/SearchProductParams';

const API_URL = import.meta.env.VITE_GATEWAY_URL;

export const createProduct = async (formData: FormData): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const fetchProductsPaginated = async (
  tenantId: string,
  page: number,
  size: number = 20
): Promise<{
  content: ProductPreview[];
  last: boolean;
  totalPages: number;
}> => {
  const response = await axios.get(`${API_URL}/products/${tenantId}`, {
    params: { page, size },
  });

  const { content, last, totalPages } = response.data;
  return {
    content: content ?? [],
    last,
    totalPages: totalPages ?? 0,
  };
};

export const getProductById = async (
  productId: string
): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/id/${productId}`);
  return response.data;
};

export const updateProduct = async (
  formData: FormData,
  tenantId: string,
  productId: string
): Promise<Product> => {
  const response = await axios.put(`${API_URL}/products/${tenantId}/${productId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const patchProduct = async (
  partialData: any,
  tenantId: string,
  productId: string
): Promise<Product> => {
  const response = await axios.patch(`${API_URL}/products/${tenantId}/${productId}`, partialData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProduct = async (
  tenantId: string,
  productId: string
): Promise<void> => {
  await axios.delete(`${API_URL}/products/${tenantId}/${productId}`);
};

export const searchProducts = async ({
  name,
  style,
  materials,
  sortBy = "name",
  direction = "asc",
  page = 0,
  size = 20,
  tenantId
}: SearchProductParams): Promise<{ content: ProductPreview[]; last: boolean; totalPages: number }> => {
  const response = await axios.post(`${API_URL}/products/search`, {
    name,
    style,
    materials,
    sortBy,
    direction,
    page,
    size,
    tenantId
  });

  const { content, last, totalPages } = response.data;
  return { content: content ?? [], last, totalPages: totalPages ?? 0, };
};