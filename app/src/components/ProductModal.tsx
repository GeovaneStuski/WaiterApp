import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { getImageByPath } from '../utils/getImageByPath';
import { CloseIcon } from './icons/CloseIcon';
import { Product } from '../types/Product';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from './Button';

type ProductModalProps = {
  isVisible: boolean;
  onClose: () => void;
  product: Product | null;
}

export function ProductModal({ isVisible, onClose, product }: ProductModalProps) {
  if(!product) return;

  return (
    <Modal transparent visible={isVisible} animationType='slide'>
      <View className='bg-black/60 flex-1 justify-end'>
        <View className='w-full pb-24 bg-gray-50 max-h-[720px] rounded-lg overflow-hidden'>
          <View className='h-48'>
            <Image className='h-full' source={{uri: getImageByPath(product.imagePath)}}/>

            <TouchableOpacity onPress={onClose} className='absolute p-0.5 bg-black/60 rounded-full right-8 top-8'>
              <CloseIcon size={32} color='#fff'/>
            </TouchableOpacity>
          </View>

          <View className='mt-8 px-6'>
            <Text className='font-bold text-lg mb-4'>{product.name}</Text>

            <Text className='text-base text-gray-main mb-8'>{product.description}</Text>

            <View>
              <Text className='text-base font-bold text-gray-main'>Ingredientes</Text>

              <FlatList
                data={product.ingredients}
                style={{marginTop: 16, maxHeight: 240}}
                showsVerticalScrollIndicator={false}
                keyExtractor={ingredient => ingredient._id}
                ItemSeparatorComponent={() => <View className='h-1'/>}
                renderItem={({item: ingredient}) => (
                  <View className='p-4 bg-white border border-gray-light flex-row rounded-lg'>
                    <Text>{ingredient.icon}</Text>
                    <Text className='ml-4 text-sm'>{ingredient.name}</Text>
                  </View>
                )}
              />
            </View>
          </View>

          <View className='flex-row justify-between px-6 py-4 items-center bg-white absolute bottom-0 w-full'>
            <View>
              <Text className='font-semibold text-base text-gray-main'>Preço</Text>

              <Text className='text-lg font-bold'>{formatCurrency(product.price)}</Text>
            </View>

            <Button onPress={() => {}}>Adicionar ao pedido</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}