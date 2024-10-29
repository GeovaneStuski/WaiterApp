import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import OrdersList from '../../services/OrdersList';
import { toast } from 'react-toastify';

export function useHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [orderIsBeingDeleted, setOrderIsBeingDeleted] = useState<null | string>(null);
  const [order, setOrder] = useState<null | Order>(null);
  const [loading, setLoading] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);

  useEffect(() => {
    (async function loadOrders() {
      try {
        const orders = await OrdersList.listFinishedOrder();

        setOrders(orders);
      } catch {

      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function handleOpenOrderModal(order: Order) {
    setOrder(order);
    setIsOrderModalVisible(true);
  }

  function handleCloseOrderModal() {
    setIsOrderModalVisible(false);
  }

  function handleOpenDeleteModal(order: Order) {
    setOrderIsBeingDeleted(order._id);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
  }

  async function handleDeleteOrder() {
    if(!orderIsBeingDeleted) return;
    setDeletionLoading(true);
    setLoading(true);

    try {
      await OrdersList.delete(orderIsBeingDeleted);

      setOrders(PrevState => PrevState.filter((order) => order._id !== orderIsBeingDeleted));
      setIsDeleteModalVisible(false);
      setIsOrderModalVisible(false);
      toast.success('Registro deletado');
    }
    catch {

    } finally {
      setLoading(false);
      setDeletionLoading(false);
    }
  }
  return {
    orders,
    isOrderModalVisible,
    isDeleteModalVisible,
    order,
    loading,
    deletionLoading,
    onDeleteOrder: handleDeleteOrder,
    onCloseDeleteModal: handleCloseDeleteModal,
    onOpenDeleteModal: handleOpenDeleteModal,
    onOpenOrderModal: handleOpenOrderModal,
    onCloseOrderModal: handleCloseOrderModal,
  };
}
