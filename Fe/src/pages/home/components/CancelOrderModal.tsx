import { Modal } from '../../../components/Modal';

type DeleteRegisterModalProps = {
  isVisible: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
}

export function CancelOrderModal({ isVisible, onClose, onConfirm, isLoading }: DeleteRegisterModalProps) {
  return (
    <Modal
      title='Cancelar Pedido'
      isLoading={isLoading}
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={onConfirm}
      onCancel={onClose}
      cancelLabel='Manter o Pedido'
      confirmLabel='Cancelar Pedido'
    >
      <div className='text-center flex flex-col font-semibold gap-2'>
        <span>Tem certeza que deseja cancelar o Pedido?</span>
        <span>essa ação não pode ser desfeita!</span>
      </div>
    </Modal>
  );
}
