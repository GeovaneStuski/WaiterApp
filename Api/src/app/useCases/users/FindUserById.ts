import { Types } from 'mongoose';
import UsersRepository from '../../repositories/UsersRepository';

export async function FindUserById(id: Types.ObjectId) {
  const user = await UsersRepository.findUserById(id);

  return user;
}