import ProductsRepository from '../../repositories/ProductsRepository';

export async function ListProducts() {
  const products = await ProductsRepository.listAll();

  return products;
}
