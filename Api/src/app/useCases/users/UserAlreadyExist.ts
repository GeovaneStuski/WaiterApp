import UsersRepository from '../../repositories/UsersRepository';

export async function UserAlreadyExist(email: string) {
  const user = await UsersRepository.findUserByEmail(email);

  return user;
}