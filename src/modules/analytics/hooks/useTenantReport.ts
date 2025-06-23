import { useEffect, useState } from 'react';
import { getTenantReport } from '../services/metricsService';
import { TenantMetricsReport } from '../models/TenantMetricReport';

export const useTenantReport = (tenantId: string) => {
  const [report, setReport] = useState<TenantMetricsReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!tenantId) return;

    setLoading(true);
    setError(null);

    getTenantReport(tenantId)
      .then(setReport)
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [tenantId]);

  return { report, loading, error };
};
