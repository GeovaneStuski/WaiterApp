import { UserType } from '../../../types/UserType';
import UsersRepository from '../../repositories/UsersRepository';

type UserBody = Omit<UserType, '_id'>

export async function CreateUser(body: UserBody) {
  const user = await UsersRepository.create(body);

  return user;
}
