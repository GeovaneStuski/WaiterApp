import zod from 'zod';

export const UserSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
  position: zod.string(),
});