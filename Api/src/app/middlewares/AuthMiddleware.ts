import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../env';
import { AuthRequest } from '../../@types/AuthRequest';
import { UserType } from '../../types/UserType';

const { SECRETKEY: secretKey } = env;

interface JwtPayload {
  user: UserType
}

export function AuthMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json('Token de acesso não informado');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token de acesso expirado' });
    }

    const payload = decoded as JwtPayload;

    req.user = payload.user;

    next();
  });
}

