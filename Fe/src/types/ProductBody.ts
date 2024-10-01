import { Product } from './Product';

export type ProductBody = Omit<Product, '_id' | 'imagePath'> & { image: File | string }
