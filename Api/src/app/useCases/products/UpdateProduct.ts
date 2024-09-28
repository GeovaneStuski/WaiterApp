import { UpdateType } from '../../../types/UpdateType';
import ProductsRepository from '../../repositories/ProductsRepository';

export async function UpdateProduct({ id, body }: UpdateType) {
  const product = await ProductsRepository.update({id, body});

  return product;
}
