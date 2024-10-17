import { Request, Response } from 'express';
import { ControllersInterface } from '../../interfaces/ControllersInterface';
import { IDSchema } from '../../zodSchemas/IDSchema';
import { UserSchema } from '../../zodSchemas/UserSchema';
import { CreateUser } from '../useCases/users/CreateUser';
import { UpdateUser } from '../useCases/users/UpdateUser';
import { ListUsers } from '../useCases/users/ListUsers';
import { UserAlreadyExist } from '../useCases/users/UserAlreadyExist';
import { DeleteUser } from '../useCases/users/DeleteUser';
import { LoginUser } from '../useCases/users/LoginUser';
import { AuthenticateBodySchema } from '../../zodSchemas/AuthenticateBodySchema';
import { ZodError } from 'zod';
import { AuthRequest } from '../../@types/AuthRequest';

class UsersController implements ControllersInterface {
  async index(req: AuthRequest, res: Response) {
    if(req.user.position !== 'admin') {
      return res.status(403).json('You dont have permission to access this action');
    }
    try {
      const users = await ListUsers();

      res.status(200).json(users);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json({error: error.errors.map((err) => err.message)});
      }

      res.sendStatus(500);
    }
  }

  async authenticate(req: Request, res: Response) {
    try {
      const body = AuthenticateBodySchema.parse(req.body);

      const userInformations = await LoginUser(body);

      if(!userInformations) {
        return res.status(400).json('Invalid credentials');
      }

      res.status(200).json(userInformations);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json({error: error.errors.map((err) => err.message)});
      }

      res.sendStatus(500);
    }
  }

  async store(req: AuthRequest, res: Response) {
    if(req.user?.position !== 'admin') {
      return res.status(403).json('You dont have permission to access this action');
    }
    try {
      const body = UserSchema.parse(req.body);

      const userExists = await UserAlreadyExist(body.email);

      if(userExists) {
        res.status(409).json({ error: 'E-mail already in use'});

        return;
      }

      const user = await CreateUser(body);

      res.status(201).json(user);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json({error: error.errors.map((err) => err.message)});
      }

      res.sendStatus(500);
    }
  }

  async update(req: AuthRequest, res: Response) {
    if(req.user?.position !== 'admin') {
      return res.status(403).json('You dont have permission to access this action');
    }

    const body = UserSchema.parse(req.body);

    try {
      const id = IDSchema.parse(req.params.id);

      const userExists = await UserAlreadyExist(body.email);

      if(userExists && userExists.email !== body.email) {
        res.status(409).json({ error: 'E-mail already in use'});

        return;
      }

      const user = await UpdateUser({id, body});

      if(!user) {
        return res.status(404).json('User not found');
      }

      res.status(200).json(user);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json({error: error.errors.map((err) => err.message)});
      }

      res.sendStatus(500);
    }
  }

  async delete(req: AuthRequest, res: Response) {
    if(req.user?.position !== 'admin') {
      return res.status(403).json('You dont have permission to access this action');
    }

    try {
      const id = IDSchema.parse(req.params.id);

      const user = await DeleteUser(id);

      if(!user) {
        return res.status(404).json('User not found');
      }

      res.sendStatus(204);
    } catch(error) {
      if(error instanceof ZodError) {
        return res.status(400).json({error: error.errors.map((err) => err.message)});
      }

      res.sendStatus(500);
    }
  }
}

export default new UsersController();
