import zod from 'zod';

export const IngredientSchema = zod.object({
  icon: zod.string({message: 'Emoji is required'}),
  name: zod.string({message: 'Name is required'}),
});
