import { Product } from '../../models/Product';

export async function ListProductsByCategory(id: string) {
  const products = await Product.find({ category: id });

  return products;
}
