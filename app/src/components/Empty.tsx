import { Text, View } from 'react-native';
import { EmptyIcon } from './icons/EmptyIcon';

type EmptyProps = {
  label: string;
}

export function Empty({label}: EmptyProps) {
  return (
    <View className='flex-1 justify-center items-center'>
      <EmptyIcon />

      <Text className='mt-2 text-base font-semibold text-gray-main/75'>{label}</Text>
    </View>
  );
}