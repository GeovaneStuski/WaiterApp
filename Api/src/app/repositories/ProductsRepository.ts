import { Types } from 'mongoose';
import { RepositoriesInterface } from '../../interfaces/RepositorysInterface';
import { ProductType } from '../../types/ProductType';
import { UpdateType } from '../../types/UpdateType';
import { Product } from '../models/Product';

class ProductsRepository implements RepositoriesInterface {
  async listAll(): Promise<ProductType[]> {
    const products = await Product.find().populate([
      'category',
      'ingredients'
    ]);

    return products;
  }

  async listByCategory(categoryId: Types.ObjectId): Promise<ProductType[]> {
    const products = await Product.find({ category: categoryId });

    return products;
  }

  async create(body: object): Promise<ProductType> {
    const ingredient = await Product.create(body);

    const populateIngredients = await ingredient.populate([
      'category',
      'ingredients'
    ]);

    return populateIngredients;
  }

  async update({id, body}: UpdateType): Promise<ProductType | null> {
    const ingredient = await Product.findByIdAndUpdate(id, body, { new: true });

    const populateIngredients = await ingredient!.populate([
      'category',
      'ingredients'
    ]);

    return populateIngredients;
  }

  async delete(id: Types.ObjectId): Promise<ProductType | null> {
    const ingredient = await Product.findByIdAndDelete(id);

    return ingredient;
  }
}

export default new ProductsRepository();
