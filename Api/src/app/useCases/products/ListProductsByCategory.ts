import { Types } from 'mongoose';
import ProductsRepository from '../../repositories/ProductsRepository';

export async function ListProductsByCategory(categoryId: Types.ObjectId) {
  const products = await ProductsRepository.listByCategory(categoryId);

  return products;
}
