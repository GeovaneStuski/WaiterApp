import { useContext, useEffect, useState } from 'react';
import { Register } from '../../types/Register';
import { Order } from '../../types/Order';
import { ApiRequest } from '../../utils/ApiRequest';
import { ApiError } from '../../errors/ApiError';
import { AuthContext } from '../../contexts/AuthContext';
import socketIo from 'socket.io-client';
import { APIURL } from '@env';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [registers, setRegisters] = useState<Register[]>([]);
  const [loading, setLoading] = useState(true);

  const { onLogout } = useContext(AuthContext);

  useEffect(() => {
    (async function getData() {
      try {
        const [orders, registers] = await Promise.all([
          ApiRequest({
            method: 'get',
            endPoint: '/orders'
          }),
          ApiRequest({
            method: 'get',
            endPoint: '/registers'
          }),
        ]);
  
        setOrders(orders.filter((order: Order) => order.status !== 'WAITING'));
        setRegisters(registers);
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

  useEffect(() => console.log(orders), [orders]);

  useEffect(() => {
    const socket = socketIo(APIURL, {
      transports: ['websocket'],
    });

    socket.on('new@Order', (order: Order) => {
      if(!orders.find((order) => order._id)) {
        setOrders(PrevState => PrevState.concat(order));
      }
    });

    socket.on('update@Order', (order: Order) => {
      setOrders(PrevState => PrevState.map(prevOrder => prevOrder._id === order._id ? order : prevOrder));
    });

    socket.on('delete@Order', (orderId: string) => {
      setOrders(PrevState => PrevState.filter((order) => order._id !== orderId));
    });
  }, []);
  
  return {
    orders,
    registers,
    loading
  };
}