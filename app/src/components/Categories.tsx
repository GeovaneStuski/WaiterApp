import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { categories } from '../mocks/categories';
import { useState } from 'react';
import { cn } from '../utils/cn';

export function Categories() {
  const [selectedCategory, setSelectCategory] = useState<string | null>(null);

  function handleChangeSelectedCategory(categoryId: string) {
    const category = categoryId === selectedCategory ? null : categoryId;
    setSelectCategory(category);
  }
  
  return (
    <View className='h-20 mt-8'>
      <FlatList
        horizontal
        data={categories}
        contentContainerStyle={{paddingRight: 24}}
        showsHorizontalScrollIndicator={false}
        keyExtractor={category => category._id}
        renderItem={({ item: category }) => {
          const isSeleted = category._id === selectedCategory;

          return (
            <TouchableOpacity onPress={() => handleChangeSelectedCategory(category._id)} className='items-center ml-6'>
              <View className={cn('h-11 w-11 bg-white shadow-md shadow-black/60 items-center justify-center rounded-full', {
                'opacity-50': !isSeleted && selectedCategory,
                'h-14 w-14':isSeleted
              })}>
                <Text className='text-lg'>{category.icon}</Text>
              </View>
              
  
              <Text className={cn('mt-2 font-bold opacity-100', {
                'opacity-50': !isSeleted && selectedCategory,
              })}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}