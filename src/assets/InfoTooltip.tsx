import React from "react";

type InfoTooltipProps = {
  children: React.ReactNode;
};

const InfoTooltip: React.FC<InfoTooltipProps> = ({ children }) => {
  return (
    <span className="relative group inline-block cursor-help align-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="8" fill="white" stroke="currentColor" strokeWidth="1.5" />
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="11"
          fontWeight="bold"
          fill="currentColor"
          fontFamily="Arial, sans-serif"
        >
          ?
        </text>
      </svg>

      <span className="absolute z-10 hidden group-hover:block bg-white border border-gray-300 text-xs text-gray-700 px-3 py-2 rounded shadow-sm w-60 whitespace-normal break-words left-full ml-2 top-1/2 -translate-y-1/2">
        {children}
      </span>
    </span>
  );
};

export default InfoTooltip;
