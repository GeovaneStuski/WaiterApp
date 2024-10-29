import { Modal } from '../../../../../components/Modal';
import { Product } from '../../../../../types/Product';
import { getImageByPath } from '../../../../../utils/getImageByPath';
import { formatCurrency } from '../../../../../utils/formatCurrency';
import { useDeleteProductModal } from './useDeleteProductModal';

type DeleteProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onDelete: (productId: string) => void;
  product: Product | null;
}

export function DeleteProductModal({ isVisible, onClose, product, onDelete }: DeleteProductModalProps) {
  if(!product) return;

  const {
    onSubmit,
    loading
  } = useDeleteProductModal({ onClose, onDelete, product });

  return (
    <Modal
      isVisible={isVisible}
      isLoading={loading}
      title='Excluir Produto'
      onClose={onClose}
      onCancel={onClose}
      onConfirm={onSubmit}
      confirmLabel='Excluir Produto'
      cancelLabel='Manter Produto'
    >
      <div className='flex items-center flex-col'>
        <span className='text-base font-semibold'>Tem certeza que deseja excluir o produto?</span>

        <div className='flex relative h-24 w-96 items-center gap-4 border border-gray-lighter/40 rounded-lg overflow-hidden mt-6'>
          <div className='w-5/12 bg-black h-full flex items-center'>
            <img src={getImageByPath(product.imagePath)}/>
          </div>

          <div className='flex flex-col text-base'>
            <span className='font-semibold'>{`${product.category.icon} ${product.category.name}`}</span>
            <span className='font-bold'>{product.name}</span>
            <span className='font-semibold'>{formatCurrency(product.price)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
