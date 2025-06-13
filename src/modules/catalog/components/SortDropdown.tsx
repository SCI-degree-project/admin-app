import React from "react";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="name_asc">Name (A-Z)</option>
    <option value="name_desc">Name (Z-A)</option>
    <option value="price_asc">Price (Low to High)</option>
    <option value="price_desc">Price (High to Low)</option>
  </select>
);

export default SortDropdown;
