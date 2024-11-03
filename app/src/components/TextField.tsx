import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { HiddenEyeIcon } from './icons/HiddenEyeIcon';
import { useState } from 'react';
import { EyeIcon } from './icons/EyeIcon';
import { cn } from '../utils/cn';

type TextFieldProps = {
  label: string;
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'password';
}

export function TextField({ label, placeHolder, onChange, value, type }: TextFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(type === 'password');
  
  function handleChangePasswordVisibility() {
    setIsPasswordVisible(PrevState => !PrevState);
  }
  return (
    <View className='w-full'>
      <Text className='text-sm text-gray-main font-semibold'>{label}</Text>

      <View>
        <TextInput 
          className={cn('bg-white rounded-lg border border-gray-light/80 mt-2 text-g h-14 p-4', {
            'pr-10': type === 'password',
          })}
          placeholder={placeHolder}
          onChangeText={onChange}
          value={value}
          secureTextEntry={isPasswordVisible}
        />

        {type === 'password' && value.length > 0 && (
          <TouchableOpacity onPress={handleChangePasswordVisibility} className='absolute translate-y-6 right-3'>
            {isPasswordVisible ? <HiddenEyeIcon color='#333' size={24} /> : <EyeIcon color='#333' size={24}/>}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}