import zod from 'zod';

export const RegistersSchema = zod.array(zod.object({
  _id: zod.string(),
  table: zod.string(),
  createdAt: zod.string(),
  products: zod.array(zod.object({
    product: zod.string(),
    quantity: zod.number(),
  }))
}));
