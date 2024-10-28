import { Product } from './Product';

export type Order = {
  _id: string;
  table: number;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE' | 'FINISHED';
  createdAt: string;
  products: {
    _id: string;
    product: Product;
    quantity: number;
  }[];
  finishedAt: null | number;
};
