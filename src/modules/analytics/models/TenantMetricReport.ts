import { ProductMetricSummary } from "./ProductmetricSummary";

export type TenantMetricsReport = {
  tenantId: string;
  period: string;
  totalClicks: number;
  totalArViews: number;
  totalSearchAppearances: number;
  totalProducts: number;
  mostClickedProducts: ProductMetricSummary[];
  mostViewedInAr: ProductMetricSummary[];
  mostSearchedProducts: ProductMetricSummary[];
};
