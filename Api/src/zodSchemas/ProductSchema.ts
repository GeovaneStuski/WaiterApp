import zod from 'zod';

export const ProductSchema = zod.object({
  image: zod.string().optional(),
  name: zod.string(),
  description: zod.string(),
  price: zod.string(),
  ingredients: zod.string(),
  category: zod.string(),
});
