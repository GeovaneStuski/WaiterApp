import { Modal } from '../../../components/Modal';

type DeleteOrderModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function DeleteOrderModal({ isVisible, onClose, onConfirm, isLoading }: DeleteOrderModalProps) {
  return (
    <Modal
      title='Excluir Registro'
      isLoading={isLoading}
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={onConfirm}
      onCancel={onClose}
      cancelLabel='Manter o Registro'
      confirmLabel='Excluir Registro'
    >
      <div className='text-center flex flex-col font-semibold gap-2'>
        <span>Tem certeza que deseja excluir o Registro?</span>
        <span>essa ação não pode ser desfeita!</span>
      </div>
    </Modal>
  );
}
