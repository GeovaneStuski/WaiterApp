import { useContext, useState } from 'react';
import { Modal } from '../../../components/Modal';
import { User } from '../../../types/User';
import UsersList from '../../../services/UsersList';
import NotAuthorizedError from '../../../Errors/NotAuthorizedError';
import { AuthenticationContext } from '../../../contexts/AuthenticationContext';

type DeleteUsersModalProps = {
  user: User;
  isVisible: boolean;
  onClose: () => void;
  onReload: () => void;
};

export function DeleteUserModal({ user, isVisible, onClose, onReload }: DeleteUsersModalProps) {
  if (!user) return;
  const [loading, setLoading] = useState(false);

  const { handleLogout } = useContext(AuthenticationContext);

  async function handleSubmit() {
    setLoading(true);
    try {
      await UsersList.delete(user._id);
    } catch (error) {
      if (error instanceof NotAuthorizedError) {
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
      confirmLabel="Excluir Usuário"
      cancelLabel="Manter Usuário"
      onConfirm={handleSubmit}
      onCancel={onClose}
      onClose={onClose}
      isLoading={loading}
      title="Excluir Usuário"
      isVisible={isVisible}
    >
      <h1>Content</h1>
    </Modal>
  );
}

