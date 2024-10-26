import { View } from 'react-native';
import { Header } from './components/Header';
import { TextField } from '../../components/TextField';
import { useContext, useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { ScreenProps } from '../../types/ScreenProps';

export function Login({navigation}: ScreenProps) {
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
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  }, [authLoading, authenticated]);

  return (
    <View className="flex-1 px-8 items-center justify-center">
      <Header/>

      <View className='w-full mt-24' style={{gap: 24}}>
        <TextField
          label='E-mail'
          value={email}
          onChange={setEmail}
          placeHolder='Digite seu e-mail'
        />

        <TextField
          label='Senha'
          value={password}
          onChange={setPassword}
          placeHolder='Digite sua senha'
        />
      </View>

      <View className='w-full absolute bottom-4'>
        <Button isLoading={loading} disabled={!isFormValid} onPress={handleSubmit}>Fazer Login</Button>
      </View>
    </View>
  );
}