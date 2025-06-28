import axios from 'axios';
import { ProductMetric } from '../models/ProductMetric';
import { TenantMetricsReport } from '../models/TenantMetricReport';

const API_URL = import.meta.env.VITE_GATEWAY_URL;

export const getProductMetric = async (productId: string): Promise<ProductMetric> => {
  const response = await axios.get(`${API_URL}/metrics/${productId}`);
  return response.data;
};

export const getTenantReport = async (tenantId: string): Promise<TenantMetricsReport> => {
  const response = await axios.get(`${API_URL}/metrics/report/${tenantId}`);
  return response.data;
};

