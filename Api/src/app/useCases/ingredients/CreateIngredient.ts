import { IngredientType } from '../../../types/IngredientType';
import IngredientsRepository from '../../repositories/IngredientsRepository';

type IngredientBody = Omit<IngredientType, '_id'>

export async function CreateIngredient(body: IngredientBody) {
  const ingredient = await IngredientsRepository.create(body);

  return ingredient;
}
