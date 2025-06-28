import React from 'react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon?: string;
  link?: { text: string; href: string };
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, link }) => (
  <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2 border">
    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
      {icon && <span className="text-xl">{icon}</span>}
      {label}
    </div>
    <div className="text-2xl font-semibold text-gray-900">{value}</div>
    {link && (
      <a href={link.href} className="text-blue-500 text-sm hover:underline">
        {link.text}
      </a>
    )}
  </div>
);
