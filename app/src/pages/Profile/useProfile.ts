import { useContext, useEffect, useState } from 'react';
import { User } from '../../types/User';
import { AuthContext } from '../../contexts/AuthContext';
import { ApiRequest } from '../../utils/ApiRequest';

export function useProfile() {
  const [user, setUser] = useState<null | User>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const isFormValid = !!(user?.name !== name || user?.email !== email || user.password !== password);

  const { onLogout, user: authUser, onReloadUser } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    if(authUser) {
      populateInputs(authUser!);
    }
  }, [authUser]);

  function populateInputs(user: User) {
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setUser(user);

    setTimeout(() => setLoading(false), 200);
  }

  async function handleUpdateUser() {
    const body = {
      name,
      email,
      password,
      position: authUser?.position,
    };

    setLoading(true);

    const route = `/users/${authUser?._id}`;

    await ApiRequest({
      method: 'put',
      endPoint: route,
      body,
    });

    onReloadUser();
  }

  return {
    isFormValid,
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    onLogout,
    loading,
    onSubmit: handleUpdateUser,
  };
}