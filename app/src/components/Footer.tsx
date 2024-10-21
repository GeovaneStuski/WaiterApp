import { View } from 'react-native';
import { BottomBar } from './ButtomBar';

export function Footer() {
  return (
    <View className="bg-white py-4 px-7">
      <BottomBar/>
    </View>
  );
}