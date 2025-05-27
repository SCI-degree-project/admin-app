import React, { useRef } from "react";

interface Model3DUploadPopupProps {
  onClose: () => void;
  onSelectExisting: (file: File) => void;
  onCreateNew: () => void;
}

const Model3DUploadPopup: React.FC<Model3DUploadPopupProps> = ({
  onClose,
  onSelectExisting,
  onCreateNew,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".glb")) {
      onSelectExisting(file);
    } else {
      alert("Please select a valid .glb 3D model file.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Add 3D Model</h2>
        <p className="text-sm text-gray-600 mb-6">
          Choose how you'd like to attach a 3D model to this product:
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleFileClick}
            className="bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white transition"
          >
            Select existing model
          </button>
          <input
            type="file"
            accept=".glb"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={onCreateNew}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Create new 3D model
          </button>
          <button
            onClick={onClose}
            className="text-red-500 text-sm hover:underline mt-2 self-end"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Model3DUploadPopup;
