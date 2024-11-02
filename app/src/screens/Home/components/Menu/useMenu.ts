import { useContext, useState } from 'react';
import { OrderContext } from '../../../../contexts/OrderContext';
import { Product } from '../../../../types/Product';

export function useMenu() {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { onAddProductToCart } = useContext(OrderContext);

  function handleOpenProductModal(product: Product) {
    setSelectedProduct(product);
    setIsProductModalVisible(true);
  }

  function handleCloseProductModal() {
    setIsProductModalVisible(false);
  }
  return {
    onOpenProductModal: handleOpenProductModal,
    onCloseProductModal: handleCloseProductModal,
    isProductModalVisible,
    selectedProduct,
    onAddProductToCart,
  };
}