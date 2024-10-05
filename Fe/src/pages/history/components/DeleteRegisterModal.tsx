import { Modal } from '../../../components/Modal';

type DeleteRegisterModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteRegisterModal({ isVisible, onClose, onConfirm }: DeleteRegisterModalProps) {
  return (
    <Modal
      title='Excluir Registro'
      isLoading={false}
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
