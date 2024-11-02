import { FlatList, View, Image, TouchableOpacity } from 'react-native';

import { useMenu } from './useMenu';

import { AddIcon } from '../../../../components/icons/AddIcon';
import { ProductModal } from '.././ProductModal';
import { ProductDetails } from './components/ProductDetails';

import { getImageByPath } from '../../../../utils/getImageByPath';
import { Product } from '../../../../types/Product';

type MenuProps = {
  products: Product[];
}

export function Menu({ products }: MenuProps) {
  const {
    onOpenProductModal,
    onCloseProductModal,
    isProductModalVisible,
    selectedProduct,
    onAddProductToCart,
  } = useMenu();

  return (
    <>
      <ProductModal
        isVisible={isProductModalVisible}
        product={selectedProduct}
        onClose={onCloseProductModal} 
        onAddItemInCart={onAddProductToCart}
      />

      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className='w-full h-[1px] bg-gray-light/40 my-6'/>}
        style={{marginTop: 32}}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <TouchableOpacity onPress={() => onOpenProductModal(product)} className='flex-row w-full items-center'>
            <Image className='w-32 h-24 rounded-lg' source={{uri: getImageByPath(product.imagePath)}}/>

            <ProductDetails product={product} />

            <TouchableOpacity onPress={() => onAddProductToCart(product)} className='absolute bottom-0 right-0'>
              <AddIcon color='#D73035' size={24}/>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </>
  );
}