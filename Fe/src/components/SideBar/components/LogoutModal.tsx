import { useContext, useState } from 'react';
import { Modal } from '../../Modal';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

type LogoutModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

export function LogoutModal({ isVisible, onClose }: LogoutModalProps) {
  const { handleLogout } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
    onClose();
    handleLogout();
  }
  return (
    <Modal
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleSubmit}
      cancelLabel='Manter-se na conta'
      confirmLabel='Sair da conta'
      isLoading={loading}
      isVisible={isVisible}
      title='Sair da conta'
    >
      <span className='m-auto'>Tem certeza que deseja sair da sua conta?</span>
    </Modal>
  );
}