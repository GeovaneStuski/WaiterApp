import zod from 'zod';

export const CategorySchema = zod.object({
  icon: zod.string(),
  name: zod.string(),
});