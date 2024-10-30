import { useEffect, useState } from 'react';
import UsersList from '../../../../services/UsersList';
import { User } from '../../../../types/User';
import isEmailValid from '../../../../utils/isEmailValid';
import ConflictData from '../../../../Errors/ConflictData';
import { toast } from 'react-toastify';
import WrongDataError from '../../../../Errors/WrongDataError';
import { useErrors } from '../../../../hooks/useErrors';

type useUserModalProps = {
  user: null | User;
  onClose: () => void;
  onUpdateUser: (user: User) => void;
  onCreateUser: (user: User) => void;
}

export function useUserModal({ onClose, user, onCreateUser, onUpdateUser }: useUserModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('waiter');
  const [loading, setLoading] = useState(false);

  const isFormValid = !!(name && isEmailValid(email) && password.length > 3);

  const { getErrorMessageByFieldName, removeError, setError } = useErrors();

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPassword(user?.password || '');
    setPosition(user?.position || 'waiter');
  }, [user]);

  function handleChangeName(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    if(getErrorMessageByFieldName('email')) {
      removeError('email');
    }

    setEmail(event.target.value);
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleChangePosition(event: React.ChangeEvent<HTMLInputElement>) {
    setPosition(event.target.id);
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      const body = { name, email, password, position };

      if (user) {
        const updatedUser = await UsersList.update(user._id, body);

        onUpdateUser(updatedUser);
      } else {
        const user = await UsersList.create(body);

        onCreateUser(user);
        onClose();
      }
    } catch(error) {
      if(error instanceof ConflictData) {
        if(!getErrorMessageByFieldName('email')) {
          setError({ field: 'email', message: 'E-mail em uso'});
        }

        toast.error('E-mail já está em uso');
      }

      if(error instanceof WrongDataError) {
        if(!getErrorMessageByFieldName('email')) {
          setError({ field: 'email', message: 'E-mail invalido'});
        }

        toast.error('E-mail invalido');
      }
    } finally {
      setLoading(false);
    }
  }
  return {
    name,
    email,
    password,
    position,
    loading,
    onSubmit: handleSubmit,
    isFormValid,
    onChangeName: handleChangeName,
    onChangeEmail: handleChangeEmail,
    onChangePassword: handleChangePassword,
    onChangePosition: handleChangePosition,
    findError: getErrorMessageByFieldName,
  };
}
