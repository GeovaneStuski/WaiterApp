import { Types } from 'mongoose';
import OrdersRepository from '../../repositories/OrdersRepository';

export async function CancelOrder(id: string) {
  const ida = new Types.ObjectId(id);
  const order = await OrdersRepository.delete(ida);

  return order;
}
