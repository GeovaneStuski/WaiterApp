import ProductsRepository from '../../repositories/ProductsRepository';

export async function DeleteProduct(id: string) {
  const product = await ProductsRepository.delete(id);

  return product;
}
