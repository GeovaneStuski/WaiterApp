import { Request, Response } from "express";
import { ControllersInterface } from "../../interfaces/ControllersInterface";
import { ProductSchema } from "../../zodSchemas/ProductSchema";
import { CreateProduct } from "../useCases/products/createProduct";
import { ListProducts } from "../useCases/products/listProducts";
import { IDSchema } from "../../zodSchemas/IDSchema";
import { UpdateProduct } from "../useCases/products/UpdateProduct";
import { DeleteProduct } from "../useCases/products/DeleteProduct";
import { ListProductsByCategory } from "../useCases/products/ListProductsByCategory";

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
    const { categoryId } = req.params

    if(!categoryId) {
      return res.status(400).json('Category is required')
    }

    try {
      const products = await ListProductsByCategory(categoryId);

      res.status(200).json(products);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    const imagePath = req.file?.filename;

    const { image, name, description, price, ingredients, category } = ProductSchema.parse(req.body);

    if(!imagePath && !image) {
      return res.status(400).json('Image is required')
    }

    try {
      const product = await CreateProduct({
        imagePath: (imagePath || image) as string,
        name,
        description,
        price: Number(price),
        ingredients: JSON.parse(ingredients),
        category: category,
      })

      res.status(201).json(product);
    } catch {
      res.sendStatus(500)
    }
  }

  async update(req: Request, res: Response){
    const imagePath = req.file?.filename;

    const { image, name, description, price, ingredients, category } = ProductSchema.parse(req.body);

    const id = IDSchema.parse(req.params.id);

    if(!imagePath && !image) {
      return res.status(400).json('Image is required')
    }

    try {
      const product = await UpdateProduct({id,
        body: {
          imagePath: (imagePath || image) as string,
          name,
          description,
          price: Number(price),
          ingredients: JSON.parse(ingredients),
          category: category,
      }})

      if(!product) {
        return res.status(404).json('Product not found')
      }

      res.status(201).json(product);
    } catch {
      res.sendStatus(500)
    }

  }
  async delete(req: Request, res: Response){
    const id = IDSchema.parse(req.params.id);

    try {
      const product = await DeleteProduct(id);

      if(!product) {
        return res.status(404).json('Product not found')
      }
      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }

}

export default new ProductsController();
