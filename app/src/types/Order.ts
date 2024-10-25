import { Product } from './Product';

export type Order = {
  _id: string;
  createAt: number;
  products: {
    product: Product;
    quantity: string;
  }[];
  status: 'DONE' | 'WAITING' | 'IN_PRODUCTION';
  table: string;
}