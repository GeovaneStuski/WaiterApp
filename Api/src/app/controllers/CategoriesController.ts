import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { ListCategories } from '../useCases/categories/ListCategories';
import { CreateCategory } from '../useCases/categories/CreateCategory';
import { CategorySchema } from '../../zodSchemas/CategorySchema';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { UpdateCategory } from '../useCases/categories/UpdateCategory';
import { DeleteCategory } from '../useCases/categories/DeleteCategory';
import { ZodError } from 'zod';

class CategoriesController implements ControllersInterface {
  async index(req: Request, res: Response) {
    try {
      const categories = await ListCategories();

      res.status(200).json(categories);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const body = CategorySchema.parse(req.body);

      const categories = await CreateCategory(body);

      res.status(201).json(categories);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to create Category');
      }

      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const body = CategorySchema.parse(req.body);

      const id = IDSchema.parse(req.params.id);

      const category = await UpdateCategory({ id, body });

      if(!category) {
        return res.status(404).json('Category not found');
      }

      res.status(200).json(category);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to update Category');
      }

      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = IDSchema.parse(req.params.id);

      const category = await DeleteCategory(id);

      if(!category) {
        return res.status(404).json('Category not found');
      }

      res.sendStatus(204);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to delete Category');
      }

      res.sendStatus(500);
    }
  }

}

export default new CategoriesController();
