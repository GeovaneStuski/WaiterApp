import { useContext, useEffect, useState } from 'react';
import { Register } from '../../types/Register';
import { Order } from '../../types/Order';
import { ApiRequest } from '../../utils/ApiRequest';
import { ApiError } from '../../errors/ApiError';
import { AuthContext } from '../../contexts/AuthContext';

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
  
  return {
    orders,
    registers,
    loading
  };
}