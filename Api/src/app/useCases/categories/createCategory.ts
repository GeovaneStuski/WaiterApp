import { CategoryBodyType } from '../../../types/CategoryBodyType';
import CategoriesRepository from '../../repositories/CategoriesRepository';

export async function CreateCategory(body: CategoryBodyType) {
  const category = await CategoriesRepository.create(body);

  return category;
}
