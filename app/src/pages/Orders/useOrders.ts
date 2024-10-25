import { useEffect, useState } from 'react';
import { Register } from '../../types/Register';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [registers, setRegisters] = useState<Register[]>([]);

  useEffect(() => {
    Promise.all([
      api.get('/orders'),
      api.get('/registers'),
    ]).then(([ordersResponse, registersReponse]) => {
      setOrders(ordersResponse.data);
      setRegisters(registersReponse.data);
    });
  }, []);
  
  return {
    orders,
    registers,
  };
}