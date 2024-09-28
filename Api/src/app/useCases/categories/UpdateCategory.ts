import { UpdateType } from '../../../types/UpdateType';
import CategoriesRepository from '../../repositories/CategoriesRepository';

export async function UpdateCategory({id, body}: UpdateType) {
  const category = await CategoriesRepository.update({id, body});

  return category;
}