import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

export default SearchInput;
