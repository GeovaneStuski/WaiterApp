import { Types } from 'mongoose';
import UsersRepository from '../../repositories/UsersRepository';

export async function DeleteUser(id: Types.ObjectId) {
  const user = await UsersRepository.delete(id);

  return user;
}
