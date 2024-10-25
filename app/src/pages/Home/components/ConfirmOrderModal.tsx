import { StatusBar } from 'expo-status-bar';
import { Modal, Text, View } from 'react-native';
import { CheckIcon } from '../../../components/icons/CheckIcon';

type ConfirmOrderModalProps = {
  isVisible: boolean;
}

export function ConfirmOrderModal({ isVisible }: ConfirmOrderModalProps) {
  return (
    <Modal animationType='fade' visible={isVisible}>
      <View className='bg-red-main flex-1 items-center justify-center'>
        <CheckIcon size={32} color='white'/>

        <Text className='font-bold text-lg text-white mt-3'>Pedido confirmado</Text>
        
        <Text className='text-white text-base mt-2'>Acompanhe na home o status de produção</Text>
      </View>

      <StatusBar backgroundColor='#D73035' translucent/>
    </Modal>
  );
}