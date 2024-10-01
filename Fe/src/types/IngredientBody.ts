import { Ingredient } from './Ingredient';

export type IngredientBody = Omit<Ingredient, '_id'>
