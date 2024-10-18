import { Text, View } from 'react-native';

export function Header() {
  return (
    <View className="px-6 pt-6">
      <View>
        <Text className="text-sm text-gray-main">Bem-vindo(a) ao</Text>
        <Text className="text-2xl font-bold text-gray-main">
          WAITER
          <Text className="font-normal">APP</Text>
        </Text>
      </View>
    </View>
  );
}