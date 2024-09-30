import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { DeleteIngredient } from '../useCases/ingredients/DeleteIndredient';
import { ZodError } from 'zod';
import { ListOrders } from '../useCases/orders/ListOrders';
import { CreateOrder } from '../useCases/orders/CreateOrder';
import { OrderSchema } from '../../zodSchemas/OrderSchema';
import { UpdateOrderStatus } from '../useCases/orders/UpdateOrderStatus';
import zod from 'zod';

const OrderStatusSchema = zod.object({
  status: zod.enum(['WAITING', 'IN_PRODUCTION', 'DONE'], { message: 'invalid status' })
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

  async store(req: Request, res: Response) {
    try {
      const { products, table } = OrderSchema.parse(req.body);

      const order = await CreateOrder({ products, table });

      res.status(201).json(order);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json(error.errors.map((err) => err.message));
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
        return res.status(404).json('Ingredient not found');
      }

      res.status(200).json(order);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json(error.errors.map((err) => err.message));
      }

      res.status(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = IDSchema.parse(req.params.orderId);

      const ingredient = await DeleteIngredient(id);

      if(!ingredient) {
        return res.status(404).json('Ingredient not found');
      }

      res.sendStatus(204);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json(error.errors.map((err) => err.message));
      }

      res.sendStatus(500);
    }
  }

}

export default new OrdersController();
