import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import BadRequest from '../errors/BadRequest';
import ILogin from '../interfaces/ILogin';
import 'dotenv/config';

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
    if (!token) {
      throw new BadRequest('error');
    }
    return jwt.verify(token, SECRET);
  }
}

export default Token;
