import { Types } from 'mongoose';
import RegistersRepository from '../../repositories/RegistersRepository';

export async function DeleteRegister(id: Types.ObjectId) {
  const register = await RegistersRepository.delete(id);

  return register;
}
