import { Text, TouchableOpacity, View } from 'react-native';
import { BellIcon } from './icons/BellIcon';

export function Header() {
  return (
    <View className="px-6 pt-6 flex-row items-center justify-between">
      <View>
        <Text className="text-sm text-black-main">Bem-vindo(a) ao</Text>

        <Text className="text-2xl font-bold text-black-main">
          WAITER

          <Text className="font-normal">APP</Text>
        </Text>
      </View>

      <TouchableOpacity className='w-11 h-11 justify-center items-center bg-white rounded-full shadow-md shadow-black/60'>
        <BellIcon color='#333333' size={24}/>
      </TouchableOpacity>
    </View>
  );
}