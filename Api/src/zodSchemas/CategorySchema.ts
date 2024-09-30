import zod from 'zod';

export const CategorySchema = zod.object({
  icon: zod.string({message: 'Emoji required'}),
  name: zod.string({message: 'Name required'}),
});
