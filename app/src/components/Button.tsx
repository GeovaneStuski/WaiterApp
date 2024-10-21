import { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
}

export function Button({ children, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className='py-3 px-7 bg-red-500 items-center rounded-full'>
      <Text className='text-white text-base font-bold'>{children}</Text>
    </TouchableOpacity>
  );
}