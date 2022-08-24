import { NextFunction, Request, Response } from 'express';
import Unauthorized from '../errors/Unauthorized';
import Token from '../helpers/token';

export default function tokenValidation(req: Request, _res: Response, next: NextFunction): void {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new Unauthorized('Token not found'));
    }

    const user = Token.decode(token);
    req.body = { ...req.body, user };
    next();
  } catch (err) {
    next(new Unauthorized('Invalid token'));
  }
}
