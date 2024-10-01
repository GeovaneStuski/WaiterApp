import { HttpClient } from './utils/HttpClient';
import { ServicesInterface } from '../interfaces/ServicesInterface';

class OrdersList implements ServicesInterface {
  private readonly HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  index() {
    const orders = this.HttpClient.get('/orders');

    return orders;
  }

  create(body: object) {
    const order = this.HttpClient.post('/orders', { body });

    return order;
  }

  update(id: string, body: object) {
    const order = this.HttpClient.put(`/orders/${id}`, { body });

    return order;
  }

  delete(id: string) {
    const order = this.HttpClient.delete(`/orders/${id}`);

    return order;
  }
}

export default new OrdersList();
