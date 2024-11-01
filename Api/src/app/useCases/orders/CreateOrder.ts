import OrdersRepository from '../../repositories/OrdersRepository';
import { OrderType } from '../../../types/OrderType';

type CreateOrderType = Pick<OrderType, 'table' | 'products' | 'user'>


export async function CreateOrder(body: CreateOrderType) {
  const order = await OrdersRepository.create(body);

  return order;
}
