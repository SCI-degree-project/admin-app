import React from 'react';
import { useTenantReport } from '../hooks/useTenantReport';
import { useTenant } from '../../../context/TenantContext';
import { StatCard } from './StatCard';
import { ProductMetricTable } from './ProductMetricTable';
import { useTranslation } from 'react-i18next';

export const Analytics: React.FC = () => {
  const { tenantId } = useTenant();
  const { t } = useTranslation();

  if (!tenantId) return <p className="p-4 text-red-500">No tenant selected.</p>;

  const { report, loading, error } = useTenantReport(tenantId);

  if (loading) return <p className="p-4">Loading analytics...</p>;
  if (error || !report) return <p className="p-4 text-red-500">Error loading report.</p>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">{t('analytics.title')} – {report.period}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={t('analytics.general-stats.clicks')} value={report.totalClicks} icon="🖱️" />
        <StatCard label={t('analytics.general-stats.ar-views')} value={report.totalArViews} icon="🕶️" />
        <StatCard label={t('analytics.general-stats.searches')} value={report.totalSearchAppearances} icon="🔍" />
        <StatCard label={t('analytics.general-stats.total-products')} value={report.totalProducts} icon="📦" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductMetricTable title={t('analytics.specific-stats.clicks.title')} products={report.mostClickedProducts} />
        <ProductMetricTable title={t('analytics.specific-stats.ar.title')} products={report.mostViewedInAr} />
        <ProductMetricTable title={t('analytics.specific-stats.search.title')} products={report.mostSearchedProducts} />
      </div>
    </div>
  );
};
