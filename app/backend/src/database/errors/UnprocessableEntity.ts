import HttpStatusCodeEnum from '../helpers/httpStatus';
import ErrorBase from './ErrorBase';

class UNPROCESSABLE_ENTITY extends ErrorBase {
  constructor(message: string) {
    super(message, HttpStatusCodeEnum.UNPROCESSABLE_ENTITY);
  }
}

export default UNPROCESSABLE_ENTITY;
