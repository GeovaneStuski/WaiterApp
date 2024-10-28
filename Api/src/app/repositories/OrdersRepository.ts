import { Types } from 'mongoose';
import { RepositoriesInterface } from '../../interfaces/RepositorysInterface';
import { Order } from '../models/Order';
import { OrderType } from '../../types/OrderType';
import { io } from '../..';

type updateStatus = {
  id: Types.ObjectId;
  status: string;
}

class OrdersRepository implements RepositoriesInterface {
  async listAll(): Promise<OrderType[]> {
    const orders = await Order.find().populate({
      path: 'products.product',
      populate: [
        { path: 'category' },
        { path: 'ingredients' },
      ],
    });

    return orders;
  }

  async updateStatus({ id, status }: updateStatus): Promise<OrderType | null> {
    const order = await Order.findByIdAndUpdate(id, { status });

    const populateOrder = await order!.populate({
      path: 'products.product',
      populate: [
        { path: 'category' },
        { path: 'ingredients' },
      ],
    });

    io.emit('mew@Notification', populateOrder);

    return order;
  }

  async create(body: object): Promise<OrderType> {
    const order = await Order.create(body);

    const populateOrder = await order.populate({
      path: 'products.product',
      populate: [
        { path: 'category' },
        { path: 'ingredients' },
      ],
    });

    io.emit('new@Order', populateOrder);

    return order;
  }

  async delete(id: Types.ObjectId): Promise<OrderType | null> {
    const order = await Order.findByIdAndDelete(id);

    return order;
  }
}

export default new OrdersRepository();
