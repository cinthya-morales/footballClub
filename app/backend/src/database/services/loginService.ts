import Users from '../models/users';
import Unauthorized from '../errors/Unauthorized';
import Token from '../helpers/token';
import BadRequest from '../errors/BadRequest';
import ILogin from '../interfaces/ILogin';

class LoginService {
  static async makeLogin(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new BadRequest('All fields must be filled');
    }
    const userFound = await Users.findOne({ where: { email } });
    if (!userFound) {
      throw new Unauthorized('Incorrect email or password');
    }
    const token = Token.create({ email, password });
    return token;
  }

  static async verifyLogin(token: string) {
    const user = Token.decode(token) as ILogin;
    console.log('USER:', user);
    const userRole = await Users.findOne({ where: { email: user.email } }) as Users;
    console.log(userRole);
    return { role: userRole.role };
  }
}

export default LoginService;
