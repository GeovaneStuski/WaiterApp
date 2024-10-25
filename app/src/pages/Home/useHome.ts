import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';

export function useHome() {
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
      })
      .catch(error => console.log('error ' + error))
      .finally(() => setLoading(false));
  }, []);

  async function ListProductsByCategory(categoryId: string | null) {
    setLoadingProducts(true);

    const route = categoryId ? `/categories/${categoryId}/products` : '/products';
    try {
      const { data } = await api.get(route);

      setProducts(data);
    } catch {
      console.log('list product error');
    } finally {
      setLoadingProducts(false);
    }
  }

  return {
    loading,
    products,
    categories,
    loadingProducts,
    ListProductsByCategory,
  };
}