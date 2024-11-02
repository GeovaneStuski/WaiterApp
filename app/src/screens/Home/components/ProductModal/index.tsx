import { FlatList, Modal, Text, View } from 'react-native';

import { Image } from './components/Image';
import { Ingredient } from './components/Ingredient';
import { Footer } from './components/Footer';

import { Product } from '../../../../types/Product';

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
      <Image 
        image={product.imagePath} onClose={onClose}
      />

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
              <Ingredient 
                icon={ingredient.icon} 
                name={ingredient.name}
              />
            )}
          />
        </View>
      </View>

      <Footer
        price={product.price} 
        handleAddToCart={handleAddToCart}
      />
    </Modal>
  );
}