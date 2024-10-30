import { useState } from 'react';
import { User } from '../../../../types/User';
import UsersList from '../../../../services/UsersList';

type useDeleteUserModalProps = {
  onClose: () => void;
  user: User | null;
  onDeleteUser: (userId: string) => void;
}

export function useDeleteUserModal({ onClose, user, onDeleteUser }: useDeleteUserModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await UsersList.delete(user!._id);

      onDeleteUser(user!._id);
    } catch {

    } finally {
      setLoading(false);
      onClose();
    }
  }
  return {
    loading,
    onSubmit: handleSubmit,
  };
}
