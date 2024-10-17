import { Response } from 'express';
import { AuthRequest } from '../@types/AuthRequest';

export interface ControllersInterface {
  index: (req: AuthRequest, res: Response) => void;
  store: (req: AuthRequest, res: Response) => void;
  update: (req: AuthRequest, res: Response) => void;
  delete: (req: AuthRequest, res: Response) => void;
}