import { Types } from 'mongoose';
import OrdersRepository from '../../repositories/OrdersRepository';

export async function CancelOrder(id: Types.ObjectId) {
  const order = await OrdersRepository.delete(id);

  return order;
}
