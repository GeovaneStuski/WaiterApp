import { Modal } from '../../../../components/Modal';
import { User } from '../../../../types/User';
import { FormGroup } from '../../../../components/FormGroup';
import { Input } from '../../../../components/Input';
import { useDeleteUserModal } from './useDeleterUserModal';

type DeleteUsersModalProps = {
  user: User | null;
  isVisible: boolean;
  onClose: () => void;
  onDeleteUser: (userId: string) => void;
};

export function DeleteUserModal({ user, isVisible, onClose, onDeleteUser }: DeleteUsersModalProps) {
  if (!user) return;

  const {
    loading,
    onSubmit
  } = useDeleteUserModal({ onClose, onDeleteUser, user });

  return (
    <Modal
      confirmLabel="Excluir Usuário"
      cancelLabel="Manter Usuário"
      onConfirm={onSubmit}
      onCancel={onClose}
      onClose={onClose}
      isLoading={loading}
      title="Excluir Usuário"
      isVisible={isVisible}
    >
      <FormGroup>
        <Input
          value={user.name}
          label='Nome'
          disabled
        />
      </FormGroup>

      <FormGroup>
        <Input
          value={user.email}
          label='E-mail'
          disabled
        />
      </FormGroup>
    </Modal>
  );
}

