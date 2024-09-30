import { Types } from 'mongoose';

export type UserType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  position: string;
}
