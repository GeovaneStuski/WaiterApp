import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { IngredientSchema } from '../../zodSchemas/IngredientSchema';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { CreateIngredient } from '../useCases/ingredients/CreateIngredient';
import { UpdateIngredient } from '../useCases/ingredients/UpdateIngredient';
import { DeleteIngredient } from '../useCases/ingredients/DeleteIndredient';
import { ListIngredients } from '../useCases/ingredients/ListIngredients';
import { ZodError } from 'zod';

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
    try {
      const body = IngredientSchema.parse(req.body);

      const ingredient = await CreateIngredient(body);

      res.status(201).json(ingredient);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to create Ingredient');
      }

      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const body = IngredientSchema.parse(req.body);

      const id = IDSchema.parse(req.params.id);

      const ingredient = await UpdateIngredient({ id, body });

      if(!ingredient) {
        return res.status(404).json('Ingredient not found');
      }

      res.status(200).json(ingredient);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to update Ingredient');
      }

      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = IDSchema.parse(req.params.id);

      const ingredient = await DeleteIngredient(id);

      if(!ingredient) {
        return res.status(404).json('Ingredient not found');
      }

      res.sendStatus(204);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to delete User');
      }

      res.sendStatus(500);
    }
  }

}

export default new IngredientsController();
