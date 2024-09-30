import { Types } from 'mongoose';
import CategoriesRepository from '../../repositories/CategoriesRepository';

export async function DeleteCategory(id: Types.ObjectId) {
  const category = await CategoriesRepository.delete(id);

  return category;
}
