import { Modal } from '../../../components/Modal';

type RefreshModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function RefreshModal({isVisible, onClose, onConfirm, isLoading}: RefreshModalProps) {
  return (
    <Modal
      title="Reiniciar o dia"
      confirmLabel='Sim, reiniciar o dia'
      cancelLabel='Não, continuar pedidos'
      isVisible={isVisible}
      onConfirm={onConfirm}
      onCancel={onClose}
      onClose={onClose}
      isLoading={isLoading}
    >
      <div className='flex flex-col gap-4 text-md font-semibold text-center'>
        <span>Ao reiniciar o dia, todos os pedidos serão arquivados no status atual.</span>

        <span>Deseja reiniciar o dia?</span>
      </div>
    </Modal>
  );
}
