// components/ProductDimensionsInput.tsx

import React from "react";
import { useTranslation } from "react-i18next";

type ProductDimensionsInputProps = {
    width: string;
    height: string;
    depth: string;
    setWidth: (value: string) => void;
    setHeight: (value: string) => void;
    setDepth: (value: string) => void;
    errors?: {
        width?: boolean;
        height?: boolean;
        depth?: boolean;
    };
};

const ProductDimensionsInput: React.FC<ProductDimensionsInputProps> = ({
    width,
    height,
    depth,
    setWidth,
    setHeight,
    setDepth,
    errors = {}
}) => {
    const { t } = useTranslation();

    return (
        <div>
            <label className="block text-base font-semibold text-gray-700 mb-1">
                {t('new-product.form.dimensions')}
            </label>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <input
                        type="number"
                        placeholder="Width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className={`border p-2 rounded-xl w-full ${
                            errors.width ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className={`border p-2 rounded-xl w-full ${
                            errors.height ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="Depth"
                        value={depth}
                        onChange={(e) => setDepth(e.target.value)}
                        className={`border p-2 rounded-xl w-full ${
                            errors.depth ? "border-red-500" : "border-gray-400"
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDimensionsInput;
