import { Types } from 'mongoose';
import RegistersRepository from '../../repositories/RegistersRepository';

export async function CreateRegister(id: Types.ObjectId) {
  const register = await RegistersRepository.create(id);

  return register;
}
