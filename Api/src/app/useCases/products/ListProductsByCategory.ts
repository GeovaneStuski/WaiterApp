import { Product } from '../../models/Product';
import ProductsRepository from '../../repositories/ProductsRepository';

export async function ListProductsByCategory(categoryId: string) {
  const products = await ProductsRepository.listByCategory(categoryId)

  return products;
}
