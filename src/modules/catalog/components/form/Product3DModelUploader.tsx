// components/Product3DModelUploader.tsx

import React, { useState } from "react";
import InfoTooltip from "../../../../assets/InfoTooltip";
import Model3DUploadPopup from "../Model3DUploadPopup";
import { useTranslation } from "react-i18next";

type Product3DModelUploaderProps = {
    modelFile: File | null;
    setModelFile: React.Dispatch<React.SetStateAction<File | null>>;
};

const Product3DModelUploader: React.FC<Product3DModelUploaderProps> = ({
    modelFile,
    setModelFile
}) => {
    const { t } = useTranslation();
    const [showModelPopup, setShowModelPopup] = useState(false);

    return (
        <div>
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-base font-semibold text-gray-700">
                    {t('new-product.form.3d-model.title')}
                </label>
                <InfoTooltip>
                    <>
                        Attach a 3D model to allow users to view the product interactively in 360° or AR.
                        <br /><br />
                        Supported format: <strong>GLB</strong>.
                    </>
                </InfoTooltip>
            </div>

            <button
                type="button"
                onClick={() => setShowModelPopup(true)}
                className={`px-4 py-2 rounded-lg transition ${
                    modelFile
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
                disabled={!!modelFile}
            >
                {t('new-product.form.3d-model.action')}
            </button>

            {modelFile && (
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-800">
                        {modelFile.name}
                    </span>
                    <button
                        type="button"
                        onClick={() => setModelFile(null)}
                        className="text-gray-500 hover:text-red-500 text-sm"
                        title="Remove 3D model"
                    >
                        ✕
                    </button>
                </div>
            )}

            {showModelPopup && (
                <Model3DUploadPopup
                    onClose={() => setShowModelPopup(false)}
                    onSelectExisting={(file) => {
                        setModelFile(file);
                        setShowModelPopup(false);
                    }}
                    onCreateNew={() => {
                        setShowModelPopup(false);
                    }}
                />
            )}
        </div>
    );
};

export default Product3DModelUploader;
