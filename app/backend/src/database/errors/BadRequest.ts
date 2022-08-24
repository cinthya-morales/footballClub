import HttpStatusCodeEnum from '../helpers/httpStatus';
import ErrorBase from './ErrorBase';

class BadRequest extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCodeEnum.BAD_REQUEST);
  }
}

export default BadRequest;
