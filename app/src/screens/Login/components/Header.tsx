import { Text, View } from 'react-native';


export function Header() {
  return (
    <View className='items-center'>
      <Text className="text-sm text-black-main">Bem-vindo(a) ao</Text>
  
      <Text className="text-2xl font-bold text-black-main">
        WAITER
  
        <Text className="font-normal">APP</Text>
      </Text>
    </View>
  );
}