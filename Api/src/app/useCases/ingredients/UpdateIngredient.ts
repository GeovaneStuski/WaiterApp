import { UpdateType } from '../../../types/UpdateType';
import IngredientsRepository from '../../repositories/IngredientsRepository';

export async function UpdateIngredient({id, body}: UpdateType) {
  const ingredient = await IngredientsRepository.update({id, body});

  return ingredient;
}
