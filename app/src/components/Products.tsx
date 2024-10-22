import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';

import { products } from '../mocks/products';
import { getImageByPath } from '../utils/getImageByPath';
import { AddIcon } from './icons/AddIcon';
import { HorizontalLine } from './HorizontalLine';
import { formatCurrency } from '../utils/formatCurrency';
import { Product } from '../types/Product';

type ProductProps = {
  onProductModalOpen: (product: Product) => void;
  onTableModalOpen: (product: Product) => void;
}

export function Products({ onProductModalOpen, onTableModalOpen }: ProductProps) {
  return (
    <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={HorizontalLine}
      style={{marginTop: 32, paddingHorizontal: 24}}
      keyExtractor={product => product._id}
      renderItem={({ item: product }) => (
        <TouchableOpacity onPress={() => onProductModalOpen(product)} className='flex-row gap-4 w-full items-center'>
          <Image className='w-32 h-24 rounded-lg' source={{uri: getImageByPath(product.imagePath)}}/>

          <View className='flex-1 justify-center'>
            <Text className='text-base font-bold text-black-main'>{product.name}</Text>

            <Text className='text-sm text-gray-main my-1'>{product.description}</Text>

            <Text className='text-base font-bold text-black-main'>{formatCurrency(product.price)}</Text>
          </View>

          <TouchableOpacity onPress={() => onTableModalOpen(product)} className='absolute bottom-0 right-0'>
            <AddIcon color='#D73035' size={24}/>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}