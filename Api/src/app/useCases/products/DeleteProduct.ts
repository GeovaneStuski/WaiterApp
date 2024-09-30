import { Types } from 'mongoose';
import ProductsRepository from '../../repositories/ProductsRepository';

export async function DeleteProduct(id: Types.ObjectId) {
  const product = await ProductsRepository.delete(id);

  return product;
}
