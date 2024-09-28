import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { IngredientSchema } from '../../zodSchemas/IngredientSchema';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { CreateIngredient } from '../useCases/ingredients/CreateIngredient';
import { UpdateIngredient } from '../useCases/ingredients/UpdateIngredient';
import { DeleteIngredient } from '../useCases/ingredients/DeleteIndredient';
import { ListIngredients } from '../useCases/ingredients/ListIngredients';

class IngredientsController implements ControllersInterface {
  async index(req: Request, res: Response) {
    try {
      const ingredients = await ListIngredients();

      res.status(200).json(ingredients);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    const body = IngredientSchema.parse(req.body);

    try {
      const ingredient = await CreateIngredient(body);

      res.status(201).json(ingredient);
    } catch {
      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const id = IDSchema.parse(req.params.id);
    const body = IngredientSchema.parse(req.body);

    try {
      const ingredient = await UpdateIngredient({ id, body });

      if(!ingredient) {
        return res.status(404).json('Ingredient not found');
      }

      res.status(200).json(ingredient);
    } catch {
      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    const id = IDSchema.parse(req.params.id);

    try {
      const ingredient = await DeleteIngredient(id);

      if(!ingredient) {
        return res.status(404).json('Ingredient not found');
      }

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }

}

export default new IngredientsController();
