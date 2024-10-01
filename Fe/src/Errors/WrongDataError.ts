import { CustomError } from '../types/CustomError';
import { CustomErrorBody } from '../types/CustomErrorBody';

export default class WrongDataError extends Error {
  constructor(response: CustomError, body: CustomErrorBody) {
    super();

    this.name = 'WrongDataError';
    this.message = body.error || `${response.status} - ${response.statusText}`;
  }
}
