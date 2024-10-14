import ProductsRepository from '../../repositories/ProductsRepository';

type ProductBody = {
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: string[];
  category: string;
}

export async function CreateProduct(body: ProductBody) {
  const product = await ProductsRepository.create(body);

  return product;
}
