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
    console.log('PAYLOAD', payload);
    const token = jwt.sign(payload, SECRET, jwtConfig);
    console.log('token:', token);
    return token;
  }

  static decode(token: string) {
    console.log('AQUIIIII DECODE');
    if (!token) {
      throw new BadRequest('error');
    }
    return jwt.verify(token, SECRET);
  }
}

export default Token;
