import { Request, Response } from 'express';

export interface ControllersInterface {
  index: (req: Request, res: Response) => void;
  store: (req: Request, res: Response) => void;
  update: (req: Request, res: Response) => void;
  delete: (req: Request, res: Response) => void;
}