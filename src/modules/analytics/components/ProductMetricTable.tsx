import React from 'react';
import { ProductMetricSummary } from '../models/ProductmetricSummary';

interface Props {
  title: string;
  products: ProductMetricSummary[];
}

export const ProductMetricTable: React.FC<Props> = ({ title, products }) => (
  <div className="bg-white rounded-2xl shadow p-4 border overflow-auto">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <table className="min-w-full text-sm text-left">
      <thead>
        <tr className="border-b text-gray-500">
          <th className="p-2">Name</th>
          <th className="p-2">Clicks</th>
          <th className="p-2">AR Views</th>
          <th className="p-2">Searches</th>
        </tr>
      </thead>
      <tbody>
        {products.map((p) => (
          <tr key={p.productId} className="border-b hover:bg-gray-50">
            <td className="p-2 font-medium">{p.name}</td>
            <td className="p-2">{p.clicks}</td>
            <td className="p-2">{p.arViews}</td>
            <td className="p-2">{p.searchAppearances}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
