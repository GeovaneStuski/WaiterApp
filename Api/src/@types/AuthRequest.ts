import { Request } from 'express';
import { UserType } from '../types/UserType';


export interface AuthRequest extends Request {
  user?: UserType;
}