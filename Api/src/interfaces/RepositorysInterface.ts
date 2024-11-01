import { Types } from 'mongoose';
import { UpdateType } from '../types/UpdateType';

export interface RepositoriesInterface {
  listAll: () => Promise<object[]>;
  create: (param: object) => Promise<object>;
  update?: (param: UpdateType) => Promise<object | null>;
  delete: (param: Types.ObjectId) => Promise<object | null>;
}
