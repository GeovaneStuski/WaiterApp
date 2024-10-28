import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { ProductSchema } from '../../zodSchemas/ProductSchema';
import { CreateProduct } from '../useCases/products/CreateProduct';
import { ListProducts } from '../useCases/products/ListProducts';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { UpdateProduct } from '../useCases/products/UpdateProduct';
import { DeleteProduct } from '../useCases/products/DeleteProduct';
import { ListProductsByCategory } from '../useCases/products/ListProductsByCategory';
import { ZodError } from 'zod';

class ProductsController implements ControllersInterface {
  async index(req: Request, res: Response) {
    try {
      const products = await ListProducts();

      res.status(200).json(products);
    } catch {
      res.sendStatus(500);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const categoryId = IDSchema.parse(req.params.categoryId);

      const products = await ListProductsByCategory(categoryId);

      res.status(200).json(products);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to list products by category');
      }

      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const imagePath = req.file?.filename;

      const { name, description, price, ingredients, category } = ProductSchema.parse(req.body);

      if(!imagePath) return res.status(400).json('Image is required');

      const product = await CreateProduct({
        imagePath: imagePath as string,
        name,
        description,
        price: Number(price),
        ingredients: ingredients ? JSON.parse(ingredients) : undefined,
        category: category,
      });

      res.status(201).json(product);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to create Product');
      }

      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response){
    try {
      const imagePath = req.file?.filename;

      const { image, name, description, price, ingredients, category } = ProductSchema.parse(req.body);

      if(!imagePath && !image) {
        return res.status(400).json('Image is required');
      }

      const id = IDSchema.parse(req.params.id);

      const product = await UpdateProduct({id,
        body: {
          imagePath: (imagePath || image) as string,
          name,
          description,
          price: Number(price),
          ingredients: ingredients ? JSON.parse(ingredients) : undefined,
          category: category,
        }});

      if(!product) {
        return res.status(404).json('Product not found');
      }

      res.status(201).json(product);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to update Product');
      }

      res.sendStatus(500);
    }

  }
  async delete(req: Request, res: Response){
    try {
      const id = IDSchema.parse(req.params.id);

      const product = await DeleteProduct(id);

      if(!product) {
        return res.status(404).json('Product not found');
      }

      res.sendStatus(204);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to delete Product');
      }

      res.sendStatus(500);
    }
  }

}

export default new ProductsController();
