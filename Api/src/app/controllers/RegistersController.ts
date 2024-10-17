import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { DeleteRegister } from '../useCases/registers/DeleteRegister';
import { RegistersSchema } from '../../zodSchemas/RegistersSchema';
import { CreateRegister } from '../useCases/registers/CreateRegister';
import { ListRegisters } from '../useCases/registers/ListRegisters';
import { CancelOrder } from '../useCases/orders/CancelOrder';
import { Types } from 'mongoose';

class RegistersController {
  async index(req: Request, res: Response) {
    try {
      const registers = await ListRegisters();

      res.status(200).json(registers);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req: Request, res: Response) {
    try {
      const registers = RegistersSchema.parse(req.body);

      await Promise.all(registers.map(async ({_id, products, table, createdAt}) => {
        await Promise.all([CreateRegister({ table, products, createdAt: new Date(createdAt) }), CancelOrder(new Types.ObjectId(_id))]);
      }));

      res.status(200).json('All orders registred in the history!');
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json(error.errors.map((err) => err.message));
      }

      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = IDSchema.parse(req.params.id);

      const register = await DeleteRegister(id);

      if(!register) {
        return res.status(404).json('Register not found');
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

export default new RegistersController();
