import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../env';

const { SECRETKEY: secretKey } = env;

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json('Token de acesso não informado');
  }

  jwt.verify(token, secretKey, (err) => {
    if(err) {
      return res.status(401).json({ error: 'Token de acesso expirado' });
    }

    next();
  });
}
