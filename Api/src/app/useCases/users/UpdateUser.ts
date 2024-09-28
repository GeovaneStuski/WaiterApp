import { UpdateType } from '../../../types/UpdateType';
import UsersRepository from '../../repositories/UsersRepository';

export async function UpdateUser({ id, body }: UpdateType) {
  const user = await UsersRepository.update({ id, body });

  return user;
}
