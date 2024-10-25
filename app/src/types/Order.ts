import { Product } from './Product';

export type Order = {
  _id: string;
  createAt: string;
  products: {
    product: Product;
    quantity: string;
  }[];
  status: 'DONE' | 'WAITING' | 'IN_PRODUCTION';
  table: string;
}