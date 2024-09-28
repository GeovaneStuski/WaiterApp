import zod from 'zod';

export const IngredientSchema = zod.object({
  icon: zod.string(),
  name: zod.string(),
});