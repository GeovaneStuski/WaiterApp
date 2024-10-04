import { HttpClient } from './utils/HttpClient';

class RegistersList {
  private readonly HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  index() {
    const registers = this.HttpClient.get('/registers');

    return registers;
  }

  create(body: string[]) {
    const register = this.HttpClient.post('/registers', { body });

    return register;
  }

  delete(id: string) {
    const register = this.HttpClient.delete(`/registers/${id}`);

    return register;
  }
}

export default new RegistersList();
