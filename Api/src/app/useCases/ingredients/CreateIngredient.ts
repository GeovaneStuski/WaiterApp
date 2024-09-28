import IngredientsRepository from '../../repositories/IngredientsRepository';

export async function CreateIngredient(body: object) {
  const ingredient = await IngredientsRepository.create(body);

  return ingredient;
}
