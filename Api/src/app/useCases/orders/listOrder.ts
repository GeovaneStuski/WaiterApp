import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrder(req: Request, res: Response) {
  try {
    const orders = await Order.find().populate({
      path: 'products.product',
      populate: {
        path: 'category'
      }
    });

    res.json(orders);
  } catch (err){
    res.status(500).json({error: 'Error to list orders'});

    console.log(err);
  }
}
