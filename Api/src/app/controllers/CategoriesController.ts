import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { ListCategories } from '../useCases/categories/ListCategories';
import { CreateCategory } from '../useCases/categories/CreateCategory';
import { CategorySchema } from '../../zodSchemas/CategorySchema';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { UpdateCategory } from '../useCases/categories/UpdateCategory';
import { DeleteCategory } from '../useCases/categories/DeleteCategory';

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
    const body = CategorySchema.parse(req.body);

    try {
      const categories = await CreateCategory(body);

      res.status(201).json(categories);
    } catch {
      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    const id = IDSchema.parse(req.params.id);
    const body = CategorySchema.parse(req.body);

    try {
      const category = await UpdateCategory({ id, body });

      if(!category) {
        return res.status(404).json('Category not found');
      }

      res.status(200).json(category);
    } catch {
      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    const id = IDSchema.parse(req.params.id);

    try {
      const category = await DeleteCategory(id);

      if(!category) {
        return res.status(404).json('Category not found');
      }

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }

}

export default new CategoriesController();
