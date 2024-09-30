import zod from 'zod';

export const AuthenticateBodySchema = zod.object({
  email: zod.string({message: 'E-mail required'}).email({message: 'Invalid E-mail'}),
  password: zod.string({message: 'Password required'}),
});
