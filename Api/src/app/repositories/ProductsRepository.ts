import { RepositoriesInterface } from '../../interfaces/RepositorysInterface';
import { ProductType } from '../../types/ProductType';
import { UpdateType } from '../../types/UpdateType';
import { Product } from '../models/Product';

class ProductsRepository implements RepositoriesInterface {
  async listAll(): Promise<ProductType[]> {
    const products = await Product.find();

    return products;
  }

  async listByCategory(categoryId: string): Promise<ProductType[]> {
    const products = await Product.find({ category: categoryId })

    return products;
  }

  async create(body: object): Promise<ProductType> {
    const ingredient = await Product.create(body);

    return ingredient;
  }

  async update({id, body}: UpdateType): Promise<ProductType | null> {
    const ingredient = await Product.findByIdAndUpdate(id, body);

    return ingredient;
  }

  async delete(id: string): Promise<ProductType | null> {
    const ingredient = await Product.findByIdAndDelete(id);

    return ingredient;
  }
}

export default new ProductsRepository();