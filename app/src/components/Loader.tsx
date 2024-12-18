import { ActivityIndicator, View } from 'react-native';

export function Loader() {
  return (
    <View className='flex-1 items-center justify-center'>
      <ActivityIndicator size="large" color="#D73035"/>
    </View>
  );
}