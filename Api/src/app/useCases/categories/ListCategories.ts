import CategoriesRepository from '../../repositories/CategoriesRepository';

export async function ListCategories() {
  const categories = await CategoriesRepository.listAll();

  return categories;
}
