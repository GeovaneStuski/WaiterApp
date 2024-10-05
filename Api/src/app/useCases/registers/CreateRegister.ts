import RegistersRepository from '../../repositories/RegistersRepository';
import { RegisterType } from '../../../types/RegisterType';

type RegisterBody = Omit<RegisterType, '_id'>

export async function CreateRegister(body: RegisterBody) {
  const register = await RegistersRepository.create(body);

  return register;
}
