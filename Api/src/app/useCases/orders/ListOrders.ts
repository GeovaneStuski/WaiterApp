import OrdersRepository from '../../repositories/OrdersRepository';

export async function ListOrders() {
  const orders = await OrdersRepository.listAll();

  return orders;
}
