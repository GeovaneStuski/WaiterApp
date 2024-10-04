import { useState } from 'react';
import { Order } from '../../../../types/Order';

export function useBoard() {
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [order, setOrder] = useState<null | Order>(null);

  function handleOpenOrderModal(order: Order) {
    setIsOrderModalVisible(true);
    setOrder(order);
  }

  function handleCloseOrderModal() {
    setIsOrderModalVisible(false);
  }

  return {
    handleCloseOrderModal,
    handleOpenOrderModal,
    order,
    isOrderModalVisible,
  };
}
