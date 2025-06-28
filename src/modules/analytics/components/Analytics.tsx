import React from 'react';
import { useTenantReport } from '../hooks/useTenantReport';
import { useTenant } from '../../../context/TenantContext';
import { StatCard } from './StatCard';
import { ProductMetricTable } from './ProductMetricTable';

export const Analytics: React.FC = () => {
  const { tenantId } = useTenant();

  if (!tenantId) return <p className="p-4 text-red-500">No tenant selected.</p>;

  const { report, loading, error } = useTenantReport(tenantId);

  if (loading) return <p className="p-4">Loading analytics...</p>;
  if (error || !report) return <p className="p-4 text-red-500">Error loading report.</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Analytics – {report.period}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Clicks" value={report.totalClicks} icon="🖱️" />
        <StatCard label="AR Views" value={report.totalArViews} icon="🕶️" />
        <StatCard label="Searches" value={report.totalSearchAppearances} icon="🔍" />
        <StatCard label="Total Products" value={report.totalProducts} icon="📦" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductMetricTable title="Most Clicked" products={report.mostClickedProducts} />
        <ProductMetricTable title="Most Viewed in AR" products={report.mostViewedInAr} />
        <ProductMetricTable title="Most Searched" products={report.mostSearchedProducts} />
      </div>
    </div>
  );
};
