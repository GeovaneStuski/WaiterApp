import { Text, TextInput, View } from 'react-native';

type TextFieldProps = {
  label: string;
  placeHolder: string;
  value: string;
  onChange: (value: string) => void;
}

export function TextField({ label, placeHolder, onChange, value }: TextFieldProps) {
  return (
    <View className='w-full'>
      <Text className='text-sm text-gray-main font-semibold'>{label}</Text>

      <TextInput 
        className='bg-white rounded-lg border border-gray-light/80 mt-2 text-g h-14 p-4'
        placeholder={placeHolder}
        onChangeText={onChange}
        value={value}
        textContentType='password'
        keyboardType='visible-password'
      />
    </View>
  );
}