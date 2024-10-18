import { FlatList, Text, View } from 'react-native';

import { categories } from '../mocks/categories';

export function Categories() {
  return (
    <View className='h-20 mt-8'>
      <FlatList
        horizontal
        data={categories}
        contentContainerStyle={{paddingRight: 24}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={category => category._id}
        renderItem={({ item }) => (
          <View className='items-center ml-6'>
            <View className='h-11 w-11 bg-white shadow-sm shadow-black items-center justify-center rounded-full'>
              <Text className='text-base'>{item.icon}</Text>
            </View>

            <Text className='mt-2'>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}