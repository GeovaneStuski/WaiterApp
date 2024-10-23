import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';

import { products } from '../mocks/products';
import { getImageByPath } from '../utils/getImageByPath';
import { AddIcon } from './icons/AddIcon';
import { formatCurrency } from '../utils/formatCurrency';
import { Product } from '../types/Product';
import { ProductModal } from './ProductModal';
import { useState } from 'react';

type ProductProps = {
  onAddItemInCart: (product: Product) => void;
}

export function Menu({ onAddItemInCart }: ProductProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <ProductModal
        isVisible={isModalVisible}
        product={selectedProduct}
        onClose={handleCloseModal} 
        onAddItemInCart={onAddItemInCart}
      />

      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='w-full h-[1px] bg-gray-light/40 my-6'/>}
        style={{marginTop: 32, paddingHorizontal: 24}}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <TouchableOpacity onPress={() => handleOpenModal(product)} className='flex-row w-full items-center'>
            <Image className='w-32 h-24 rounded-lg' source={{uri: getImageByPath(product.imagePath)}}/>

            <View className='ml-4 flex-1 justify-center'>
              <Text className='text-base font-bold text-black-main'>{product.name}</Text>

              <Text className='text-sm text-gray-main my-1'>{product.description}</Text>

              <Text className='text-base font-bold text-black-main'>{formatCurrency(product.price)}</Text>
            </View>

            <TouchableOpacity onPress={() => onAddItemInCart(product)} className='absolute bottom-0 right-0'>
              <AddIcon color='#D73035' size={24}/>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </>
  );
}