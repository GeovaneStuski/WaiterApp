import { HttpClient } from './utils/HttpClient';
import { ServicesInterface } from '../interfaces/ServicesInterface';

class IngredientsList implements ServicesInterface {
  private readonly HttpClient: HttpClient;

  constructor() {
    this.HttpClient = new HttpClient('http://localhost:3001');
  }

  index() {
    const ingredients = this.HttpClient.get('/ingredients');

    return ingredients;
  }

  create(body: object) {
    const ingredient = this.HttpClient.post('/ingredients', { body });

    return ingredient;
  }

  update(id: string, body: object) {
    const ingredient = this.HttpClient.put(`/ingredients/${id}`, { body });

    return ingredient;
  }

  delete(id: string) {
    const ingredient = this.HttpClient.delete(`/ingredients/${id}`);

    return ingredient;
  }
}

export default new IngredientsList();
