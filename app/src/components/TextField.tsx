import { Text, TextInput, View } from 'react-native';

type TextFieldProps = {
  label: string;
  placeHolder: string;
}

export function TextField({ label, placeHolder }: TextFieldProps) {
  return (
    <View>
      <Text className='text-sm text-gray-main font-semibold'>{label}</Text>

      <TextInput 
        className='bg-white rounded-lg border border-gray-light/80 mt-2 text-g h-14 p-4'
        placeholder={placeHolder}
      />
    </View>
  );
}