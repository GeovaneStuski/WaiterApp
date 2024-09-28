import UsersRepository from '../../repositories/UsersRepository';
import { UserBodyType } from '../../../types/UserBodyType';

export async function CreateUser(body: UserBodyType) {
  const user = await UsersRepository.create(body);

  return user;
}
