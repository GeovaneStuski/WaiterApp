import { CartItem } from './CartItem';

export type Order = {
  _id: string;
  createAt: number;
  products: CartItem[];
  status: 'DONE' | 'WAITING' | 'IN_PRODUCTION';
  table: string;
}