import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { useProfile } from './useProfile';
import { LeaveIcon } from '../../components/icons/LeaveIcon';

export function Profile() {
  const {
    email,
    isFormValid,
    name,
    password,
    setName,
    setEmail,
    setPassword,
    onLogout,
    loading,
    onSubmit,
  } = useProfile();

  return (
    <View className='flex-1 px-6 mt-6'>
      {!loading && (
        <>
          <View className='flex-row justify-between items-center'>
            <Text className='text-2xl text-black-main font-bold'>Meu Perfil</Text>

            <TouchableOpacity onPress={onLogout} className='flex-row items-center'>
              <LeaveIcon color='#D73035' size={24}/>

              <Text className='ml-2 text-red-main font-semibold text-base'>Sair</Text>
            </TouchableOpacity>
          </View>

          <View style={{gap: 40}}>
            <View className='mt-12 justify-between' style={{gap: 24}}>
              <TextField
                label='Nome'
                placeHolder="Digite o nome"
                value={name}
                onChange={setName}
              />

              <TextField
                label='E-mail'
                placeHolder="Digite o e-mail"
                value={email}
                onChange={setEmail}
              />

              <TextField
                label='Senha'
                placeHolder="Digite a senha"
                value={password}
                onChange={setPassword}
              />
            </View>

            <Button
              disabled={!isFormValid}
              onPress={onSubmit}
            >
              Salvar alterações
            </Button>
          </View>
        </>
      )}

      {loading && (
        <View className='flex-1 items-center justify-center'>
          <ActivityIndicator color="#D73035" size="large"/>
        </View>
      )}
    </View>
  );
}