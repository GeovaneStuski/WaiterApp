import { Types } from 'mongoose';
import { RepositoriesInterface } from '../../interfaces/RepositorysInterface';
import { CategoryType } from '../../types/CategoryType';
import { UpdateType } from '../../types/UpdateType';
import { Category } from '../models/Category';

class CategoriesRepository implements RepositoriesInterface {
  async listAll(): Promise<CategoryType[]> {
    const categories = await Category.find();

    return categories;
  }

  async create(body: object): Promise<CategoryType> {
    const category = await Category.create(body);

    return category;
  }

  async update({id, body}: UpdateType): Promise<CategoryType | null> {
    const category = await Category.findByIdAndUpdate(id, body);

    return category;
  }

  async delete(id: Types.ObjectId): Promise<CategoryType | null> {
    const category = await Category.findByIdAndDelete(id);

    return category;
  }
}

export default new CategoriesRepository();
