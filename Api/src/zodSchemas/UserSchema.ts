import zod from 'zod';

export const UserSchema = zod.object({
  name: zod.string({message: 'Name required'}),
  email: zod.string({message: 'E-mail required'}).email({message: 'Invalid E-mail'}),
  password: zod.string({message: 'Password required'}),
  position: zod.enum(['waiter', 'admin'], {message: 'Position required'}),
});
