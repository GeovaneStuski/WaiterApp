import RegistersRepository from '../../repositories/RegistersRepository';

export async function ListRegisters() {
  const registers = await RegistersRepository.listAll();

  return registers;
}
