import { Types } from 'mongoose';

export type CategoryType = {
  _id: Types.ObjectId;
  icon: string;
  name: string;
}
