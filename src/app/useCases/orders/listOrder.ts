import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrder(req: Request, res: Response) {
  try {
    const categories = await Order.find().sort({ createdAt: -1 }).populate('products.product');

    res.json(categories);
  } catch {
    res.status(500).json({error: 'Error to list orders'});
  }
}
