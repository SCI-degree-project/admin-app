type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    materials: string[];
    style: string
    tenantId: string;
    gallery: File[];
    model: File;
    width: number;
    height: number;
    depth: number
}

export type { Product };