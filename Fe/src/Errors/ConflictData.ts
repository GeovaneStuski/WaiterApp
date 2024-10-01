import { CustomError } from '../types/CustomError';
import { CustomErrorBody } from '../types/CustomErrorBody';

export default class ConflictData extends Error {
  constructor(response: CustomError, body: CustomErrorBody) {
    super();

    this.name = 'ConflictData';
    this.message = body.error || `${response.status} - ${response.statusText}`;
  }
}
