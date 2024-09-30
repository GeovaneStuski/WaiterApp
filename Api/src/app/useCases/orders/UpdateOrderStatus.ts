import { Types } from 'mongoose';
import OrdersRepository from '../../repositories/OrdersRepository';

type UpdateOrderStatusType = {
  id: Types.ObjectId;
  status: string;
}

export async function UpdateOrderStatus({ id, status }: UpdateOrderStatusType) {
  const order = await OrdersRepository.updateStatus({ id, status });

  return order;
}
