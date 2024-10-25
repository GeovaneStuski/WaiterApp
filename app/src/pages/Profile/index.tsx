import { Text, View } from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';

export function Profile() {
  return (
    <View className='flex-1 px-6 mt-6'>
      <Text className='text-2xl text-black-main font-bold'>Meu Perfil</Text>

      <View style={{gap: 40}}>
        <View className='mt-12 justify-between' style={{gap: 24}}>
          <TextField
            label='Nome'
            placeHolder="Digite o nome"
          />

          <TextField
            label='E-mail'
            placeHolder="Digite o e-mail"
          />

          <TextField
            label='Senha'
            placeHolder="Digite a senha"
          />

          <TextField
            label='Confirmação da Senha'
            placeHolder="Confirme a senha"
          />
        </View>

        <Button onPress={() => {}}>Salvar alterações</Button>
      </View>
    </View>
  );
}