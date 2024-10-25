import { model, Schema } from 'mongoose';

export const Registers = model('Registers', new Schema({
  table: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
    default: 'WAITING',
  },

  createdAt: {
    type: Date,
    required: true,
  },

  products: {
    required: true,
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },

      quantity: {
        type: Number,
        default: 1,
      },
    }],
  },

  finishedAt: {
    type: Date,
    default: Date.now,
  },
}));
