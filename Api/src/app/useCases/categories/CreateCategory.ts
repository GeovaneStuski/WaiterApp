import { CategoryType } from '../../../types/CategoryType';
import CategoriesRepository from '../../repositories/CategoriesRepository';

type CategoryBody = Omit<CategoryType, '_id'>

export async function CreateCategory(body: CategoryBody) {
  const category = await CategoriesRepository.create(body);

  return category;
}
