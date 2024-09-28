import zod from 'zod';

export const AuthenticateBodySchema = zod.object({
  email: zod.string(),
  password: zod.string(),
});