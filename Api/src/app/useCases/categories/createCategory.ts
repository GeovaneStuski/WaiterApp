import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    const response = await Category.create({icon, name});

    res.json(response);
  } catch {
    res.status(500).json({error: 'Error to create category'});
  }
}
