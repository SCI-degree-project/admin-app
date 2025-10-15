type ProductFormBaseProps = {
    initialData?: {
        name?: string;
        description?: string;
        price?: number;
        materials?: string[];
        style?: string;
        dimensions?: {
            width?: number;
            height?: number;
            depth?: number;
        };
        media?: {
            gallery?: {
                imageUrl: File;
                altText: string;
            }[];
            model?: File | null;
        };
    };
    actionName?: string;
    onSubmit: (formData: FormData) => void;
    isSubmitting?: boolean;
    error?: string | null;
};

export type { ProductFormBaseProps };