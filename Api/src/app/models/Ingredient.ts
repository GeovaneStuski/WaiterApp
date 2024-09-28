import { model, Schema } from 'mongoose';

export const Ingredient = model('Ingredient', new Schema({
  icon: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  }
}));