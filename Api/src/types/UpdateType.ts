import { Types } from 'mongoose';

export type UpdateType = {
  id: Types.ObjectId;
  body: object;
}
