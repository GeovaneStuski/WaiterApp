import { Modal } from '../../../components/Modal';
import { Register } from '../../../types/Register';
import { formatData } from '../../../utils/formatData';
import { getImageByPath } from '../../../utils/getImageByPath';
import { priceFormater } from '../../../utils/priceFormater';

type RegisterModalProps = {
  register: Register | null;
  onClose: () => void;
  isVisible: boolean;
  onCancel: (param: Register) => void;
}

export function RegisterModal({ isVisible, onClose, register, onCancel }: RegisterModalProps) {
  if(!register) return;

  return (
    <Modal
      title={`Mesa ${register?.table}`}
      onClose={onClose}
      isVisible={isVisible}
      isLoading={false}
      cancelLabel='Exluir Registro'
      onCancel={() => onCancel(register)}
    >
      <div className='mt-6'>
        <div className='flex flex-col gap-1 mb-5'>
          <span className='font-semibold text-sm text-gray-main'>Data do pedido</span>

          <strong className='text-base'>{formatData(register?.createdAt as Date)}</strong>
        </div>

        <span className='font-semibold text-sm text-gray-main'>Itens</span>

        <div className='space-y-4 my-4'>
          {register?.products.map(({product, quantity}) => (
            <div key={product._id} className='flex gap-3 items-center'>
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

          <span className='font-bold text-md'>{priceFormater(register?.products.reduce((acc, product) => acc + product.product.price * product.quantity, 0) as number)}</span>
        </div>
      </div>
    </Modal>
  );
}
