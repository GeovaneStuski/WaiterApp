import { useContext, useEffect, useState } from 'react';
import { User } from '../../types/User';
import { AuthContext } from '../../contexts/AuthContext';

export function useProfile() {
  const [user, setUser] = useState<null | User>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = !!(user?.name !== name || user?.email !== email || user.password !== password);

  const { onLogout, user: authUser } = useContext(AuthContext);

  useEffect(() => {
    if(authUser) {
      populateInputs(authUser!);
    }
  }, [authUser]);

  function populateInputs(user: User) {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setUser(user);
  }

  return {
    isFormValid,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    onLogout
  };
}