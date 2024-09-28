import { UpdateType } from '../types/UpdateType';

export interface RepositoriesInterface {
  listAll: () => Promise<object[]>;
  create: (param: object) => Promise<object>;
  update: (param: UpdateType) => Promise<object | null>;
  delete: (param: string) => Promise<object | null>;
}