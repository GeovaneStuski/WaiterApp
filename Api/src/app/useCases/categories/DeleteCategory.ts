import CategoriesRepository from '../../repositories/CategoriesRepository';

export async function DeleteCategory(id: string) {
  const category = await CategoriesRepository.delete(id);

  return category;
}