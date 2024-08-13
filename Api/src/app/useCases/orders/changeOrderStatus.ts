import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if(!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(400).json({error: 'Error status should be one these: WAITING, IN_PRODUCTION, DONE'});
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch {
    res.status(500).json({error: 'Error to change order status'});
  }
}
