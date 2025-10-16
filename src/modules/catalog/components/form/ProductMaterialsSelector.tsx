import React from "react";
import { materialOptions } from "../../../../domain/Material";
import { useTranslation } from "react-i18next";

type ProductMaterialsSelectorProps = {
    selectedMaterials: string[];
    setSelectedMaterials: React.Dispatch<React.SetStateAction<string[]>>;
    error?: boolean;
};

const ProductMaterialsSelector: React.FC<ProductMaterialsSelectorProps> = ({
    selectedMaterials,
    setSelectedMaterials,
    error = false
}) => {
    const { t } = useTranslation();

    const toggleMaterial = (material: string) => {
        setSelectedMaterials((prev) =>
            prev.includes(material)
                ? prev.filter((m) => m !== material)
                : [...prev, material]
        );
    };

    return (
        <div>
            <label className="block text-base font-semibold text-gray-700 mb-2">
                {t('new-product.form.materials')}
            </label>
            <div
                className={`grid grid-cols-2 gap-2 border rounded-xl p-2 ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
            >
                {materialOptions.map((material) => (
                    <label key={material} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedMaterials.includes(material)}
                            onChange={() => toggleMaterial(material)}
                        />
                        <span className="text-sm">{t(`materials.${material}`)}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ProductMaterialsSelector;
