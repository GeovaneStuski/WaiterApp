import { ReactNode } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { cn } from '../utils/cn';

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button({ children, onPress, disabled = false, isLoading = false }: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      onPress={onPress}
      className={cn('py-3 px-7 w-full bg-red-500 items-center rounded-full', {
        'bg-gray-light': disabled || isLoading,
      })}
    >
      {!isLoading ? (
        <Text className='text-white text-base font-bold'>{children}</Text>
      ) : (
        <ActivityIndicator color="#D73035" size="small" />
      )}
    </TouchableOpacity>
  );
}