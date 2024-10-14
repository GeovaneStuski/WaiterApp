import OrdersRepository from '../../repositories/OrdersRepository';
import { OrderType } from '../../../types/OrderType';

type CreateOrderType = Pick<OrderType, 'table' | 'products'>


export async function CreateOrder(body: CreateOrderType) {
  const order = await OrdersRepository.create(body);

  return order;
}
