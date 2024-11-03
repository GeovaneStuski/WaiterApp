import jwt from 'jsonwebtoken';
import { env } from '../../../env';
import UsersRepository from '../../repositories/UsersRepository';

const { SECRETKEY: secretKey } = env;

type LoginBodySchema = {
  email: string,
  password: string,
};

export async function LoginUser({email, password}: LoginBodySchema) {
  const user = await UsersRepository.findUserByEmail(email);

  if(user && user.password === password) {
    const token = jwt.sign({ user }, secretKey, { expiresIn: '1m' });

    return { user, token };
  }

  return null;
}
