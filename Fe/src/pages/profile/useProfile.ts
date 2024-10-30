import { useContext, useEffect, useState } from 'react';
import UsersList from '../../services/UsersList';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { useErrors } from '../../hooks/useErrors';
import ConflictData from '../../Errors/ConflictData';
import WrongDataError from '../../Errors/WrongDataError';
import { toast } from 'react-toastify';

export function useProfile() {
  const [loading, setLoading] = useState(true);
  const [updateRequestLoading, setUpdateRequestLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, setUser } = useContext(AuthenticationContext);

  const isFormValid = user && (user.name !== name || user.email !== email || user.password !== password);

  const { getErrorMessageByFieldName, removeError, setError } = useErrors();

  useEffect(() => {
    if(user) {
      populateInputs();
      setTimeout(() => {
        setLoading(false);
      }, 700);
    }
  }, [user]);

  function populateInputs() {
    if(!user) return;
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
  }

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

  async function handleSubmit() {
    try {
      if(!user) return;

      setUpdateRequestLoading(true);

      const body = { name, email, password, position: user.position};

      const updatedUser = await UsersList.update(user._id, body);

      setLoading(true);

      setUser(updatedUser);

      setTimeout(() => {
        setLoading(false);
      }, 200);
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
      setUpdateRequestLoading(false);
    }
  }
  return {
    name,
    email,
    password,
    onSubmit: handleSubmit,
    onChangeName: handleChangeName,
    onChangeEmail: handleChangeEmail,
    onChangePassword: handleChangePassword,
    isFormValid,
    updateRequestLoading,
    loading,
    user,
    findError: getErrorMessageByFieldName,
  };
}
