import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type ImagePreviewProps = {
  file: File | string;
  onRemove: () => void;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, onRemove }) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (typeof file === "string") {
      setPreviewUrl(file);
    } else {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return (
    <div className="relative group w-16 h-16">
      <img
        src={previewUrl}
        alt="Preview"
        className="w-full h-full object-cover rounded border"
      />

      <button
        type="button"
        onClick={onRemove}
        className="absolute top-0 right-0 m-1 p-0.5 bg-white rounded-full shadow text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
        title="Remove"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ImagePreview;
