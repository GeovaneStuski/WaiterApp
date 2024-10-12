import { useContext, useState } from 'react';
import { Modal } from '../../../../../components/Modal';
import { Product } from '../../../../../types/Product';
import { getImageByPath } from '../../../../../utils/getImageByPath';
import { priceFormater } from '../../../../../utils/priceFormater';
import NotAuthorizedError from '../../../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../../../contexts/AuthenticationContext';
import ProductsList from '../../../../../services/ProductsList';

type DeleteProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
  product: Product | null;
}

export function DeleteProductModal({ isVisible, onClose, product, onReload }: DeleteProductModalProps) {
  if(!product) return;
  const [loading, setLoading] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function handleSumit() {
    if(!product) return;
    setLoading(true);

    try {
      await ProductsList.delete(product?._id);
    } catch(error) {
      if(error instanceof NotAuthorizedError) {
        handleLogout();
      }
    } finally {
      setLoading(false);
      onClose();
      onReload();
    }
  }
  return (
    <Modal
      isVisible={isVisible}
      isLoading={loading}
      title='Excluir Produto'
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleSumit}
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
            <span className='font-semibold'>{priceFormater(product.price)}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
