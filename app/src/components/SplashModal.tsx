import { Modal, Text, View } from 'react-native';
import { Logo } from './Logo';

type SplashModalProps = {
  isVisible: boolean;
}

export function SplashModal({ isVisible }: SplashModalProps) {
  return (
    <Modal animationType='fade' visible={isVisible}>
      <View className='bg-red-main flex-1 justify-center items-center'>
        <Logo/>

        <Text className='text-white font-bold text-3xl mt-5'>
          WAITER

          <Text className='font-normal'>APP</Text>
        </Text>

        <Text className='font-semibold text-base text-white mt-2'>O App do Garçom</Text>
      </View>
    </Modal>
  );
}