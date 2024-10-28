import { Types } from 'mongoose';

export type OrderType = {
  _id: Types.ObjectId;
  table: string;
  status: string;
  createdAt: NativeDate;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  finishedAt: Date | null;
}
