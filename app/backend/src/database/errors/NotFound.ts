import HttpStatusCodeEnum from '../helpers/httpStatus';
import ErrorBase from './ErrorBase';

class NOT_FOUND extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCodeEnum.NOT_FOUND);
  }
}

export default NOT_FOUND;
