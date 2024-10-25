import { Order } from './Order';

export type Register = Omit<Order, 'status'> & {
  finishedAt: number;
}