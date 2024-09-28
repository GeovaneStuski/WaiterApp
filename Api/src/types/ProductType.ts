import { Types } from "mongoose";

export type ProductType = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Types.ObjectId[];
  category: Types.ObjectId;
}
