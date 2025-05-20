import React, { useMemo } from "react";

interface ImagePreviewProps {
  file: File;
  onRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove }) => {
  const previewUrl = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div className="flex items-center gap-3 relative group">
      <img
        src={previewUrl}
        alt={file.name}
        className="w-10 h-10 object-cover rounded border"
      />
      <div className="truncate max-w-[180px]">
        <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
        <p className="text-xs text-gray-500">{file.type}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-red-500 text-sm absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remove"
      >
        ✕
      </button>
    </div>
  );
};

export default ImagePreview;
