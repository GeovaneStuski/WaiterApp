import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { ZodError } from 'zod';
import { ListOrders } from '../useCases/orders/ListOrders';
import { CreateOrder } from '../useCases/orders/CreateOrder';
import { OrderSchema } from '../../zodSchemas/OrderSchema';
import { UpdateOrderStatus } from '../useCases/orders/UpdateOrderStatus';
import zod from 'zod';
import { CancelOrder } from '../useCases/orders/CancelOrder';
import { ListFinishedOrders } from '../useCases/orders/ListFinishedOrders';
import { io } from '../..';
import { CreateNotification } from '../useCases/notifications/CreateNotification';

const OrderStatusSchema = zod.object({
  status: zod.enum(['WAITING', 'IN_PRODUCTION', 'DONE', 'FINISHED'], { message: 'invalid status' })
});

class OrdersController implements ControllersInterface {
  async index(req: Request, res: Response) {
    try {
      const orders = await ListOrders();

      res.status(200).json(orders);
    } catch {
      res.sendStatus(500);
    }
  }

  async finishedOrders(req: Request, res: Response) {
    try {
      const orders = await ListFinishedOrders();

      res.status(200).json(orders);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const user = req.user;

      const { products, table } = OrderSchema.parse(req.body);

      const order = await CreateOrder({ products, table, user: user!._id});

      io.emit('new@Order', order);

      res.status(201).json(order);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to create Order');
      }

      res.sendStatus(500);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { status } = OrderStatusSchema.parse(req.body);

      const id = IDSchema.parse(req.params.id);

      const order = await UpdateOrderStatus({id, status});

      if(!order) {
        return res.status(404).json('Order not found');
      }

      if(order.status === 'IN_PRODUCTION' || order.status === 'DONE') {
        const notifcation = await CreateNotification({
          order: {
            table: order.table,
            status: order.status,
          },
          user: order.user,
        });

        io.emit('new@Notification', notifcation);
      }

      if (order.status !== 'WAITING') {
        io.emit('update@Order', order);
      }

      res.status(200).json(order);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json('Error to update Order status');
      }

      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = IDSchema.parse(req.params.id);

      const order = await CancelOrder(id);

      if(!order) {
        return res.status(404).json('Order not found');
      }

      io.emit('delete@Order', order._id);

      res.sendStatus(204);
    } catch(error) {
      console.log(error);
      if(error instanceof ZodError) {
        return res.status(400).json('Error to delete Order');
      }

      res.sendStatus(500);
    }
  }

}

export default new OrdersController();
