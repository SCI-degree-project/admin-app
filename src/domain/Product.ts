import { GallertItem } from "./GalleryItem";

type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    materials: string[];
    style: string
    tenantId: string;
    media: Media
    dimensions: Dimensions;
}

type Dimensions = {
    width: number;
    height: number;
    depth: number;
}

type Media = {
    gallery: GallertItem[];
    model: File;
}

export type { Product };