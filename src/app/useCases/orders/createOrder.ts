import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function createOrder(req: Request, res: Response) {
  try {
    const { table, products } = req.body;

    const response = await Order.create({ table, products });

    res.json(response);
  } catch {
    res.status(500).json({error: 'Error to create order'});
  }
}
