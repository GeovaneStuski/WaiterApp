import { HttpClient } from './utils/HttpClient';
import { ServicesInterface } from '../interfaces/ServicesInterface';

class CategoriesList implements ServicesInterface {
  private readonly HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  index() {
    const categories = this.HttpClient.get('/categories');

    return categories;
  }

  create(body: object) {
    const category = this.HttpClient.get('/categories', { body });

    return category;
  }

  update(id: string, body: object) {
    const category = this.HttpClient.get(`/categories/${id}`, { body });

    return category;
  }

  delete(id: string) {
    const category = this.HttpClient.delete(`/categories/${id}`);

    return category;
  }
}

export default new CategoriesList();
