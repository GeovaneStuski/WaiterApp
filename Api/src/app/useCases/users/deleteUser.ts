import UsersRepository from '../../repositories/UsersRepository';

export async function DeleteUser(id: string) {
  const user = await UsersRepository.delete(id);

  return user;
}
