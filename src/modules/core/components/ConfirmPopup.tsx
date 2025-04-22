// ConfirmPopup.tsx
import React from "react";

type ConfirmPopupProps = {
    isOpen: boolean;
    title?: string;
    message?: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const ConfirmPopup: React.FC<ConfirmPopupProps> = ({
    isOpen,
    title = "Are you sure?",
    message = "This action cannot be undone.",
    onCancel,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-600">{message}</p>
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmPopup;
