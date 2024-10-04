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

  const { handleLogout } = useContext(AuthenticationContext);


  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const orders = await OrdersList.index();

      setOrders(orders);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
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

    await RegistersList.create(orders.map((order) => order._id));

    setLoading(false);
    setIsRefreshModalVisible(false);
    loadOrders();
  }

  return {
    orders,
    isRefreshModalVisible,
    handleOpenRefreshModal,
    handleCloseRefreshModal,
    loadOrders,
    handleOrdersToHistory,
    loading,
  };
}
