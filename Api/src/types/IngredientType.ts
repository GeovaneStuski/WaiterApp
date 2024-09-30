import { Types } from 'mongoose';

export type IngredientType = {
  _id: Types.ObjectId;
  icon: string;
  name: string;
}
