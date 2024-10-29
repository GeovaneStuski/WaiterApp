import { Modal } from '../../../components/Modal';
import { Order } from '../../../types/Order';
import { formatCurrency } from '../../../utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { getImageByPath } from '../../../utils/getImageByPath';

type OrderModalProps = {
  order: Order | null;
  onClose: () => void;
  isVisible: boolean;
  onCancel: (param: Order) => void;
}

export function OrderModal({ isVisible, onClose, order, onCancel }: OrderModalProps) {
  if(!order) return;

  const total = order.products.reduce((acc, product) => (
    acc + product.product.price * product.quantity
  ), 0);

  return (
    <Modal
      title={`Mesa ${order.table}`}
      onClose={onClose}
      isVisible={isVisible}
      isLoading={false}
      cancelLabel='Exluir Registro'
      onCancel={() => onCancel(order)}
    >
      <div className='mt-6'>
        <div className='flex flex-col gap-1 mb-5'>
          <span className='font-semibold text-sm text-gray-main'>Data do pedido</span>

          <strong className='text-base'>{formatDate(order.createdAt)}</strong>
        </div>

        <span className='font-semibold text-sm text-gray-main'>Itens</span>

        <div className='space-y-4 my-4'>
          {order.products.map(({product, quantity}) => (
            <div key={product._id} className='flex gap-3 items-center'>
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
    </Modal>
  );
}
