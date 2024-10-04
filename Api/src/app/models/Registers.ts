import { model, Schema } from 'mongoose';

export const Registers = model('Registers', new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
}));
