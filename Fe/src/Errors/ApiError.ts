import { CustomError } from '../types/CustomError';
import { CustomErrorBody } from '../types/CustomErrorBody';

export default class ApiError extends Error {
  constructor(response: CustomError, body: CustomErrorBody) {
    super();

    this.name = 'ApiError';
    this.message = body.error || `${response.status} - ${response.statusText}`;
  }
}
