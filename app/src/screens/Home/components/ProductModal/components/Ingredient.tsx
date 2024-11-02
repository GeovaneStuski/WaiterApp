import { Text, View } from 'react-native';

type IngredientProps = {
  icon: string;
  name: string;
}

export function Ingredient({icon, name}: IngredientProps) {
  return (
    <View className='p-4 bg-[#fafafa] border border-gray-light flex-row rounded-lg mb-1'>
      <Text>{icon}</Text>

      <Text className='ml-4 text-sm'>{name}</Text>
    </View>
  );
}