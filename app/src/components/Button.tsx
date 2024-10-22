import { ReactNode } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { cn } from '../utils/cn';

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ children, onPress, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      className={cn('py-3 px-7 bg-red-500 items-center rounded-full', {
        'bg-gray-light': disabled
      })}
    >
      <Text className='text-white text-base font-bold'>{children}</Text>
    </TouchableOpacity>
  );
}