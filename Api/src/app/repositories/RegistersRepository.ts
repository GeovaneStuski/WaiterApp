import { Types } from 'mongoose';
import { Registers } from '../models/Registers';

class RegistersRepository {
  async listAll() {
    const orders = await Registers.find().populate({
      path: 'products.product',
      populate: [
        { path: 'category' },
        { path: 'ingredients' },
      ],
    });

    return orders;
  }

  async create(body: object) {
    const order = await Registers.create(body);

    return order;
  }

  async delete(id: Types.ObjectId) {
    const order = await Registers.findByIdAndDelete(id);

    return order;
  }
}

export default new RegistersRepository();
