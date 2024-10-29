import { Product } from './Product';

export type Order = {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE' | 'FINISHED';
  createdAt: number;
  products: {
    _id: string;
    product: Product;
    quantity: number;
  }[];
  finishedAt: null | number;
};
