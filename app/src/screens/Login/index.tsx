import { View } from 'react-native';
import { Header } from './components/Header';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { ScreenProps } from '../../types/ScreenProps';
import { useLogin } from './useLogin';

export function Login({ navigation }: ScreenProps) {
  const {
    handleSubmit,
    isFormValid,
    loading,
    email,
    password,
    setEmail,
    setPassword,
  } = useLogin({ navigation });

  return (
    <View className="flex-1 px-8 items-center justify-between pb-4 pt-16">
      <Header/>

      <View className='w-full' style={{gap: 24}}>
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
          type='password'
        />
      </View>

      <View className='w-full'>
        <Button isLoading={loading} disabled={!isFormValid} onPress={handleSubmit}>Fazer Login</Button>
      </View>
    </View>
  );
}