import { HttpClient } from './utils/HttpClient';
import { ServicesInterface } from '../interfaces/ServicesInterface';

class ProductsList implements ServicesInterface {
  private readonly HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  index() {
    const products = this.HttpClient.get('/products');

    return products;
  }

  create(body: object) {
    const product = this.HttpClient.post('/products', { body });

    return product;
  }

  update(id: string, body: object) {
    const product = this.HttpClient.put(`/products/${id}`, { body });

    return product;
  }

  delete(id: string) {
    const product = this.HttpClient.delete(`/products/${id}`);

    return product;
  }
}

export default new ProductsList();
