import { Types } from 'mongoose';
import { Registers } from '../models/Registers';

class RegistersRepository {
  async listAll() {
    const orders = await Registers.find();

    return orders;
  }

  async create(id: Types.ObjectId) {
    const order = await Registers.create({order: id});

    return order;
  }

  async delete(id: Types.ObjectId) {
    const order = await Registers.findByIdAndDelete(id);

    return order;
  }
}

export default new RegistersRepository();
