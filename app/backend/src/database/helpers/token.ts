import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';
import Unauthorized from '../errors/Unauthorized';

const SECRET = process.env.SECRET || 'jwt_secret';
const jwtConfig: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

class Token {
  static create(payload: ILogin) {
    const token = jwt.sign(payload, SECRET, jwtConfig);
    return token;
  }

  static decode(token: string) {
    try {
      if (!token || token === '') {
        throw new Unauthorized('Token must be a valid token');
      }
      return jwt.verify(token, SECRET);
    } catch (e) {
      throw new Unauthorized('Token must be a valid token');
    }
  }
}

export default Token;
