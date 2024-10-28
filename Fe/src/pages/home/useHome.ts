import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import OrdersList from '../../services/OrdersList';
import socketIo from 'socket.io-client';

export function useHome() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function loadOrders() {
      try {
        setLoading(true);

        const orders = await OrdersList.index();

        setOrders(orders);
      } catch {

      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('new@Order', (order: Order) => {
      setOrders(PrevState => (
        PrevState.find((item) => item._id === order._id)
          ? PrevState
          : PrevState.concat(order)
      ));
    });
  }, []);

  function handleCancelOrder(orderId: string) {
    setOrders(PrevState => PrevState.filter(({ _id }) => _id !== orderId));
  }

  function handleChangeOrderStatus(orderId: string, status: Order['status']) {
    setOrders(PrevState => PrevState.map((order) => (
      order._id === orderId ? {
        ...order, status
      } : order
    )));
  }

  return {
    orders,
    loading,
    onCancelOrder: handleCancelOrder,
    onChangeOrderStatus: handleChangeOrderStatus,
  };
}
