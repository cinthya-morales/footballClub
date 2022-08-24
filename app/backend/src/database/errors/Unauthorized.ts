import HttpStatusCodeEnum from '../helpers/httpStatus';
import ErrorBase from './ErrorBase';

class Unauthorized extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCodeEnum.UNAUTHORIZED);
  }
}

export default Unauthorized;
