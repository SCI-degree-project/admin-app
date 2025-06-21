type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    materials: string[];
    style: string
    tenantId: string;
    gallery: File[];
    model: File
}

export type { Product };