export interface SearchProductParams {
  name?: string;
  style?: string;
  materials?: string[];
  sortBy?: string;
  direction?: string;
  page?: number;
  size?: number;
  tenantId: string;
}