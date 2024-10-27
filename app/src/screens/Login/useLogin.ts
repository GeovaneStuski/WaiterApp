import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

type useLoginProps = {
  navigation: {
    navigate: (page: string) => void;
  }
}

export function useLogin({ navigation }: useLoginProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = !!(email && password);


  const { onUserAuthencation, loading: authLoading, authenticated } = useContext(AuthContext);

  async function handleSubmit() {
    onUserAuthencation({ email, password });
    setLoading(true);
  }

  useEffect(() => {
    if(!authLoading && authenticated) {
      navigation.navigate('Main');
      
      handleClearFields();
    }

    if(!authLoading) {
      setLoading(false);
    }
  }, [authLoading, authenticated]);

  function handleClearFields() {
    setEmail('');
    setPassword('');
  }

  return {
    handleSubmit,
    isFormValid,
    loading,
    email,
    password,
    setEmail,
    setPassword,
  };
}