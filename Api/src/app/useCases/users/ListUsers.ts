import UsersRepository from '../../repositories/UsersRepository';

export async function ListUsers() {
  const users = await UsersRepository.listAll();

  return users;
}
