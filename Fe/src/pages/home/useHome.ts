import { useContext, useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import OrdersList from '../../services/OrdersList';
import NotAuthorizedError from '../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import RegistersList from '../../services/RegistersList';

export function useHome() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRefreshModalVisible, setIsRefreshModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);


  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setIsRequestInProgress(true);
    try {
      const orders = await OrdersList.index();

      setOrders(orders);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setIsRequestInProgress(false);
    }
  }

  function handleOpenRefreshModal() {
    setIsRefreshModalVisible(true);
  }

  function handleCloseRefreshModal() {
    setIsRefreshModalVisible(false);
  }

  async function handleOrdersToHistory() {
    setLoading(true);

    try {
      await RegistersList.create(orders.map(({_id, table, products, createdAt}) => ({
        _id, table, products: products.map(({product, quantity}) => ({ product: product._id, quantity })), createdAt })));

      setLoading(false);
      setIsRefreshModalVisible(false);
      loadOrders();
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    }
  }

  return {
    orders,
    isRefreshModalVisible,
    handleOpenRefreshModal,
    handleCloseRefreshModal,
    loadOrders,
    handleOrdersToHistory,
    loading,
    isRequestInProgress,
  };
}
