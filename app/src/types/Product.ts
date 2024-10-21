import { Category } from './Category';
import { Ingredient } from './Ingredient';

export type Product = {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: Ingredient[];
  category: Category;
};
