import { useState } from 'react';
import { Modal } from '../../../components/Modal';
import OrdersList from '../../../services/OrdersList';
import { Order } from '../../../types/Order';
import { getImageByPath } from '../../../utils/getImageByPath';
import { CancelOrderModal } from './CancelOrderModal';
import { toast } from 'react-toastify';
import { formatCurrency } from '../../../utils/formatCurrency';

type StatusVariables = {
  message: string;
  status: Order['status'];
}

type OrderModalProps = {
  order: Order | null;
  isVisible: boolean;
  status: string;
  onClose: () => void;
  onCancel: (orderId: string) => void;
  onChangeStatus: (orderId: string, status: Order['status']) => void;
}

export function OrderModal({ order, isVisible, status, onClose, onCancel, onChangeStatus }: OrderModalProps) {
  if(!order) return;
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const total = order?.products.reduce((acc, product) => acc + product.product.price * product.quantity,0);

  const confirmLabel = {
    WAITING: 'Preparar Pedido',
    'IN_PRODUCTION': 'Concluir Pedido',
    DONE: 'Finalizar Pedido',
    FINISHED: '',
  };

  async function handleChangeOrderStatus() {
    if(order!.status === 'FINISHED') return;

    setLoading(true);

    const statusVariables = {
      WAITING: {
        status: 'IN_PRODUCTION',
        message: `Preparo do pedido da mesa ${order!.table} inciado`
      },
      'IN_PRODUCTION': {
        status: 'DONE',
        message: `Preparo do pedido da mesa ${order!.table} concluido`
      },
      DONE: {
        status: 'FINISHED',
        message: 'Pedido finalizado'
      },
    };

    const { message, status } = statusVariables[order!.status] as StatusVariables;


    await OrdersList.update(order!._id, { status: status });

    onChangeStatus(order!._id, status);
    onClose();
    setLoading(false);
    toast.success(message);
  }

  function handleOpenCancelModal() {
    setIsCancelModalVisible(true);
  }

  function handleCloseCancelModal() {
    setIsCancelModalVisible(false);
  }

  async function handleCancelOrder() {
    setDeleteLoading(true);

    await OrdersList.delete(order!._id);

    toast.success(`Pedido da mesa ${order!.table} cancelado`);
    onCancel(order!._id);
    setIsCancelModalVisible(false);
    onClose();
    setDeleteLoading(false);
  }

  return (
    <Modal
      isVisible={isVisible}
      confirmLabel={confirmLabel[order.status]}
      cancelLabel='Cancelar Pedido'
      title={`Mesa ${order.table}`}
      onClose={onClose}
      onConfirm={handleChangeOrderStatus}
      onCancel={handleOpenCancelModal}
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

                    <span className='text-sm text-gray-main'>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center'>
            <span className='font-semibold text-sm text-gray-main'>Total</span>

            <span className='font-bold text-md'>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
