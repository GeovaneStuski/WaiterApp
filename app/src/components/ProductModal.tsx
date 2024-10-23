import { FlatList, ImageBackground, Modal, Text, TouchableOpacity, View } from 'react-native';
import { getImageByPath } from '../utils/getImageByPath';
import { CloseIcon } from './icons/CloseIcon';
import { Product } from '../types/Product';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from './Button';

type ProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  product: Product | null;
  onAddItemInCart: (product: Product) => void;
}

export function ProductModal({ isVisible, onClose, product, onAddItemInCart }: ProductModalProps) {
  if(!product) return;

  function handleAddToCart() {
    onAddItemInCart(product!);
    onClose();
  }

  return (
    <Modal transparent visible={isVisible} animationType='slide'>
      <ImageBackground className='h-52 items-end p-6' source={{uri: getImageByPath(product.imagePath)}}>
        <TouchableOpacity onPress={onClose} className='w-8 h-8 bg-black/60 rounded-full'>
          <CloseIcon size={32} color='#fff'/>
        </TouchableOpacity>
      </ImageBackground>

      <View className='flex-1 bg-[#fafafa] px-6'>
        <Text className='font-bold text-lg mt-8'>{product.name}</Text>

        <Text className='text-base text-gray-main mt-4'>{product.description}</Text>

        <View className='mt-8 flex-1'>
          <Text className='text-base font-bold text-gray-main'>Ingredientes</Text>

          <FlatList
            data={product.ingredients}
            style={{marginTop: 16}}
            showsVerticalScrollIndicator={false}
            keyExtractor={ingredient => ingredient._id}
            renderItem={({item: ingredient}) => (
              <View className='p-4 bg-[#fafafa] border border-gray-light flex-row rounded-lg mb-1'>
                <Text>{ingredient.icon}</Text>

                <Text className='ml-4 text-sm'>{ingredient.name}</Text>
              </View>
            )}
          />
        </View>
      </View>

      <View className='flex-row justify-between px-6 py-4 items-center bg-white w-full'>
        <View>
          <Text className='font-semibold text-base text-gray-main'>Preço</Text>

          <Text className='text-lg font-bold'>{formatCurrency(product.price)}</Text>
        </View>

        <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
      </View>
    </Modal>
  );
}