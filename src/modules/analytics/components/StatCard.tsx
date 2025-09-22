import React, { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon?: string;
  link?: { text: string; href: string };
  duration?: number;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  link,
  duration = 1000,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const initialValue = 0;
    const change = value - initialValue;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const currentValue = Math.floor(initialValue + change * progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value, duration]);

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-2 border transition-transform duration-300 hover:scale-105">
      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
        {icon && <span className="text-xl">{icon}</span>}
        {label}
      </div>
      <div className="text-2xl font-semibold text-gray-900">
        {displayValue.toLocaleString()}
      </div>
      {link && (
        <a
          href={link.href}
          className="text-blue-500 text-sm hover:underline"
        >
          {link.text}
        </a>
      )}
    </div>
  );
};
