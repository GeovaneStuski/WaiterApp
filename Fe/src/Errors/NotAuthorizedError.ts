import { CustomError } from '../types/CustomError';
import { CustomErrorBody } from '../types/CustomErrorBody';

export default class NotAuthorizedError extends Error {
  constructor(response: CustomError, body: CustomErrorBody) {
    super();

    this.name = 'NotAuthorizedError';
    this.message = body.error || `${response.status} - ${response.statusText}`;
  }
}
