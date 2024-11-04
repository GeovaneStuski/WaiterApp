import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../contexts/AuthContext';
import socketIo from 'socket.io-client';
import { APIURL } from '@env';
import { ApiError } from '../../errors/ApiError';

import { ApiRequest } from '../../utils/ApiRequest';
import { Order } from '../../types/Order';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const { onLogout } = useContext(AuthContext);

  useEffect(() => {
    (async function getData() {
      try {
        const orders = await ApiRequest({
          method: 'get',
          endPoint: '/orders'
        }) as Order[];
        
        setOrders(orders.filter((order) => order.status !== 'WAITING'));
      } catch(errorResponse) {
        const error = errorResponse as ApiError;

        if(error.status === 401) {
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const socket = socketIo(APIURL, {
      transports: ['websocket'],
    });

    socket.on('update@Order', (order: Order) => {
      console.log(order);
      setOrders(PrevState => {
        const itemIndex = PrevState.findIndex(prevOrder => prevOrder._id === order._id);
  
        if (itemIndex < 0) {
          return PrevState.concat(order);
        } else {
          if(order.status !== PrevState[itemIndex].status) {
            const newOrders = [...PrevState];
            const item = PrevState[itemIndex];

            newOrders[itemIndex] = {
              ...item,
              status: order.status,
            };

            return newOrders;
          } else {
            return PrevState;
          }
        }
      });
    });

    socket.on('delete@Order', (orderId: string) => {
      setOrders(PrevState => PrevState.filter((order) => order._id !== orderId));
    });
  }, []);
  
  return {
    orders,
    loading
  };
}