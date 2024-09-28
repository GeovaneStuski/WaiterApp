import IngredientsRepository from '../../repositories/IngredientsRepository';

export async function ListIngredients() {
  const ingredients = await IngredientsRepository.listAll();

  return ingredients;
}
