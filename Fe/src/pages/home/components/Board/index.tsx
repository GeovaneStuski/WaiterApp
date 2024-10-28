import { Order } from '../../../../types/Order';
import { OrderModal } from '../OrderModal';
import { useBoard } from './useBoard';

type BoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancel: (orderId: string) => void;
  onChangeStatus: (orderId: string, status: Order['status']) => void;
}

export function Board({icon, title, orders, onCancel, onChangeStatus}: BoardProps) {
  const {
    handleCloseOrderModal,
    handleOpenOrderModal,
    isOrderModalVisible,
    order,
  } = useBoard();
  return (
    <div className="max-w-96 w-full h-fit border border-gray-light/40 p-4 rounded-lg flex items-center flex-col">
      <OrderModal
        isVisible={isOrderModalVisible}
        order={order}
        status={`${icon} ${title}`}
        onClose={handleCloseOrderModal}
        onCancel={onCancel}
        onChangeStatus={onChangeStatus}
      />
      <div className="flex gap-2 items-center">
        <span className="text-xl">{icon}</span>

        <span className="text-lg font-bold ">{title}</span>

        <span className="px-2 bg-gray-lighter/30 text-md font-semibold rounded-lg">{orders.length}</span>
      </div>

      {orders.length > 0 && (
        <div className="w-full mt-6 py-2 space-y-6">
          {orders.map((order) => (
            <button key={order._id} onClick={() => handleOpenOrderModal(order)} className="w-full bg-white border rounded-[4px] border-gray-light/40 py-10 flex flex-col items-center">
              <span className="font-semibold text-md">Mesa {order.table}</span>

              <small className="text-sm">{order.products.length} itens</small>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
