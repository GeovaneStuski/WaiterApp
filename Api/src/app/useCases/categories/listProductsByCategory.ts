import { Product } from '../../models/Product';
import { Request, Response } from 'express';

export default async function listProductsByCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({category: categoryId});

    res.status(200).json(products);
  } catch {
    res.status(500).json({error: 'Error to list products by category'});
  }
}
