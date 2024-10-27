import { useContext, useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { ApiRequest } from '../../utils/ApiRequest';
import { AuthContext } from '../../contexts/AuthContext';
import { ApiError } from '../../errors/ApiError';

export function useHome() {
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isNotificationsModalVisible, setIsNotificationsModalVisible] = useState(false);

  const { onLogout } = useContext(AuthContext);

  useEffect(() => {
    (async function getData() {
      try {
        const [categories, products] = await Promise.all([
          ApiRequest({
            method: 'get',
            endPoint: '/categories',
          }),
      
          ApiRequest({
            method: 'get',
            endPoint: '/products',
          })
        ]);

        setCategories(categories);
        setProducts(products);
      } catch(errorResponse) {
        const error = errorResponse as ApiError;

        if (error.status === 401) {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function ListProductsByCategory(categoryId: string | null) {
    setLoadingProducts(true);

    const route = categoryId ? `/categories/${categoryId}/products` : '/products';
    try {
      const products = await ApiRequest({
        method: 'get',
        endPoint: route,
      });

      setProducts(products);
    } catch(errorResponse) {
      const error = errorResponse as ApiError;

      if (error.status === 401) {
        onLogout();
      }
    } finally {
      setLoadingProducts(false);
    }
  }

  function handleOpenNotificationsModal() {
    setIsNotificationsModalVisible(true);
  }

  function handleCloseNotificationsModal() {
    setIsNotificationsModalVisible(false);
  }

  return {
    loading,
    products,
    categories,
    loadingProducts,
    ListProductsByCategory,
    onOpenNotificationsModal: handleOpenNotificationsModal,
    onCloseNotificationsModal: handleCloseNotificationsModal,
    isNotificationsModalVisible,
  };
}