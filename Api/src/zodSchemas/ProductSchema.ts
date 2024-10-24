import zod from 'zod';

export const ProductSchema = zod.object({
  image: zod.string({message: 'Image is required'}).optional(),
  name: zod.string({message: 'Name is required'}),
  description: zod.string({message: 'Description is required'}),
  price: zod.string({message: 'Price is required'}),
  ingredients: zod.string().optional(),
  category: zod.string({message: 'Category is required'}),
});
