import { Product } from './Product';

export type Order = {
  _id: string;
  table: number;
  status: string;
  createdAt: string;
  products: {
    _id: string;
    product: Product;
    quantity: number;
  }[];
};
