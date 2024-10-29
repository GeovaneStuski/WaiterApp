import OrdersRepository from '../../repositories/OrdersRepository';

export async function ListFinishedOrders() {
  const orders = await OrdersRepository.ListOnlyFinishedOrders();

  return orders;
}
