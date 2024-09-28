import IngredientsRepository from '../../repositories/IngredientsRepository';

export async function DeleteIngredient(id: string) {
  const ingredient = await IngredientsRepository.delete(id);

  return ingredient;
}
