import { Types } from 'mongoose';
import { RepositoriesInterface } from '../../interfaces/RepositorysInterface';
import { IngredientType } from '../../types/IngredientType';
import { UpdateType } from '../../types/UpdateType';
import { Ingredient } from '../models/Ingredient';

class IngredientsRepository implements RepositoriesInterface {
  async listAll(): Promise<IngredientType[]> {
    const ingredients = await Ingredient.find();

    return ingredients;
  }

  async create(body: object): Promise<IngredientType> {
    const ingredient = await Ingredient.create(body);

    return ingredient;
  }

  async update({id, body}: UpdateType): Promise<IngredientType | null> {
    const ingredient = await Ingredient.findByIdAndUpdate(id, body , { new: true });

    return ingredient;
  }

  async delete(id: Types.ObjectId): Promise<IngredientType | null> {
    const ingredient = await Ingredient.findByIdAndDelete(id);

    return ingredient;
  }
}

export default new IngredientsRepository();
