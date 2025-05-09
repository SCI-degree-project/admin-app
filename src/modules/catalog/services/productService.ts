import axios from 'axios';
import { Product } from '../../../domain/Product';

const API_URL = import.meta.env.VITE_GATEWAY_URL;

export const fetchProducts = async (tenantId: string): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products/${tenantId}`);
  return response.data;
};

export const createProduct = async (formData: FormData, tenantId: string): Promise<Product> => {
  const response = await axios.post(`${API_URL}/products/${tenantId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
