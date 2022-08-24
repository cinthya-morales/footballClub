import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/loginService';
import BadRequest from '../errors/BadRequest';
import Unauthorized from '../errors/Unauthorized';

class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await LoginService.makeLogin(email, password);
      return res.status(200).json({ token });
    } catch (e) {
      if (e instanceof BadRequest) {
        return res.status(400).json({ message: e.message });
      } if (e instanceof Unauthorized) {
        return res.status(401).json({ message: e.message });
      }
      next(e);
    }
  }

  static async validateToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('TO AQUI NO CONTROLLER');
      const token = req.headers.authorization || '';
      const role = await LoginService.verifyLogin(token);
      console.log(role);
      return res.status(200).json(role);
    } catch (e) {
      if (e instanceof BadRequest) {
        return res.status(400).json({ message: e.message });
      }
      next(e);
    }
  }
}

export default LoginController;
