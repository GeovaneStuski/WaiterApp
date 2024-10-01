import { useContext, useEffect, useState } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import { useErrors } from '../../hooks/useErrors';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = isEmailValid(email) && email && password.length > 4;

  const { handleLogin, authenticated } = useContext(AuthenticationContext);

  const { getErrorMessageByFieldName, setError, removeError } = useErrors();

  const navigate = useNavigate();

  useEffect(() => {
    if(authenticated) {
      navigate('/');
    }
  }, [authenticated]);

  function handleChangeEmail(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);

    removeError('email');
  }

  function handleLeftEmailField(event: React.FocusEvent<HTMLInputElement>) {
    if(!isEmailValid(event.target.value) && event.target.value) {
      setError({ field: 'email', message: 'E-mail invalido' });
    }
  }

  function handleChangePassword(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    handleLogin( { email, password } );
  }

  return {
    email,
    password,
    handleChangeEmail,
    handleLeftEmailField,
    handleChangePassword,
    handleSubmit,
    getErrorMessageByFieldName,
    isFormValid
  };
}
