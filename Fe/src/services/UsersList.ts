import { HttpClient } from './utils/HttpClient';
import { ServicesInterface } from '../interfaces/ServicesInterface';

type AuthenticateBody = {
  email: string;
  password: string;
}

class UsersList implements ServicesInterface {
  private readonly HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  index() {
    const users = this.HttpClient.get('/users');

    return users;
  }

  authenticate(body: AuthenticateBody) {
    const user = this.HttpClient.post('/authentication', { body });

    return user;
  }

  create(body: object) {
    const user = this.HttpClient.post('/users', { body });

    return user;
  }

  update(id: string, body: object) {
    const user = this.HttpClient.put(`/users/${id}`, { body });

    return user;
  }

  delete(id: string) {
    const user = this.HttpClient.delete(`/users/${id}`);

    return user;
  }
}

export default new UsersList();
