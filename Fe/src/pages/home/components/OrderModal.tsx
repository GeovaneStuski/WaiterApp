import { useState } from 'react';
import { Modal } from '../../../components/Modal';
import OrdersList from '../../../services/OrdersList';
import { Order } from '../../../types/Order';
import { getImageByPath } from '../../../utils/getImageByPath';
import { priceFormater } from '../../../utils/priceFormater';
import { CancelOrderModal } from './CancelOrderModal';

type OrderModalProps = {
  order: Order | null;
  isVisible: boolean;
  status: string;
  onClose: () => void;
  onReload: () => void;
}

export function OrderModal({ order, isVisible, status, onClose, onReload }: OrderModalProps) {
  if(!order) return;
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const totalPrice = order?.products.reduce((acc, product) => acc + product.product.price * product.quantity,0);

  const StatusVariables = {
    WAITING: {
      cancel: handleOpenCancelModal,
      confirm: handleChangeOrderStatus,
      cancelLabel: 'Cancelar Pedido',
      confirmLabel: 'Preparar Pedido',
    },
    IN_PRODUCTION: {
      cancel: handleOpenCancelModal,
      confirm: handleChangeOrderStatus,
      cancelLabel: 'Cancelar Pedido',
      confirmLabel: 'Concluir Pedido',
    },
    DONE: {
      cancel: undefined,
      confirm: undefined,
      cancelLabel: undefined,
      confirmLabel: undefined,
    },
  } as const;

  type StatusType = keyof typeof StatusVariables;

  const statusKey = order.status as StatusType;

  async function handleChangeOrderStatus() {
    if(!order) return;
    setLoading(true);

    const status = order.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await OrdersList.update(order._id, { status });

    onReload();
    onClose();
    setLoading(false);
  }

  function handleOpenCancelModal() {
    setIsCancelModalVisible(true);
  }

  function handleCloseCancelModal() {
    setIsCancelModalVisible(false);
  }

  async function handleCancelOrder() {
    if(!order) return;
    setDeleteLoading(true);

    await OrdersList.delete(order?._id);

    setIsCancelModalVisible(false);
    onReload();
    onClose();
    setDeleteLoading(false);
  }

  return (
    <Modal
      isVisible={isVisible}
      confirmLabel={StatusVariables[statusKey].confirmLabel}
      cancelLabel={StatusVariables[statusKey].cancelLabel}
      title={`Mesa ${order.table}`}
      onClose={onClose}
      onConfirm={StatusVariables[statusKey].confirm}
      onCancel={StatusVariables[statusKey].cancel}
      isLoading={loading}
    >
      <CancelOrderModal
        onClose={handleCloseCancelModal}
        isVisible={isCancelModalVisible}
        onConfirm={handleCancelOrder}
        isLoading={deleteLoading}
      />

      <div className='w-full'>
        <div className='flex flex-col'>
          <span className='font-semibold text-sm text-gray-main'>Status do Pedido</span>

          <strong className='text-md'>{status}</strong>
        </div>

        <div className='mt-6'>
          <span className='font-semibold text-sm text-gray-main'>Itens</span>

          <div className='space-y-4 my-4'>
            {order.products.map(({_id, product, quantity}) => (
              <div key={_id} className='flex gap-3 items-center'>
                <img className='w-14 h-9 rounded-lg' src={getImageByPath(product.imagePath)}/>

                <div className='flex gap-3'>
                  <span className='text-sm text-gray-light'>{quantity}x</span>

                  <div className='flex flex-col'>
                    <strong>{product.name}</strong>

                    <span className='text-sm text-gray-main'>{priceFormater(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-semibold text-sm text-gray-main'>Total</span>

            <span className='font-bold text-md'>{priceFormater(totalPrice)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
