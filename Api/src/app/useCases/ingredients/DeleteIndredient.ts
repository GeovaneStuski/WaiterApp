import { Types } from 'mongoose';
import IngredientsRepository from '../../repositories/IngredientsRepository';

export async function DeleteIngredient(id: Types.ObjectId) {
  const ingredient = await IngredientsRepository.delete(id);

  return ingredient;
}
