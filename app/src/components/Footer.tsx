import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { BottomBar } from './BottomBar';
import { Button } from './Button';
import { formatCurrency } from '../utils/formatCurrency';
import { getImageByPath } from '../utils/getImageByPath';
import { AddIcon } from './icons/AddIcon';
import { LessIcon } from './icons/LessIcon';
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { ConfirmOrderModal } from './ConfirmOrderModal';

export function Footer() {
  const {
    table,
    cartItems,
    onAddProductToCart,
    onDecrementProductFromCart,
    onCreateOrder,
    isConfirmModalVisible,
  } = useContext(OrderContext);
  return (
    <>
      <ConfirmOrderModal isVisible={isConfirmModalVisible}/>

      {!table && <BottomBar/>}

      {table && (
        <View className='absolute bottom-0'>
          <FlatList
            data={cartItems}
            keyExtractor={({product}) => product._id}
            renderItem={({item}) => {
              const product = item.product;
              const quatity = item.quantity;

              return (
                <View className='w-full flex-row py-2.5 px-6 bg-white items-center justify-between'>
                  <View className='flex-row items-center'>
                    <Image className='w-14 h-10 rounded-lg' source={{uri: getImageByPath(product.imagePath)}}/>
  
                    <View className='flex-row items-start ml-3'>
                      <Text className='text-sm text-gray-main/70'>{quatity}x</Text>
  
                      <View className='ml-3'>
                        <Text className='text-sm font-bold'>{product.name}</Text>
  
                        <Text className='text-sm text-gray-main mt-1'>{formatCurrency(product.price)}</Text>
                      </View>
                    </View>
                  </View>
  
                  <View className='flex-row items-center justify-between w-16'>
                    <TouchableOpacity onPress={() => onAddProductToCart(product)}>
                      <AddIcon color='#D73035' size={24}/>
                    </TouchableOpacity>
  
                    <TouchableOpacity onPress={() => onDecrementProductFromCart(product)}>
                      <LessIcon color='#D73035' size={24}/>
                    </TouchableOpacity>
                  </View>
                </View> 
              );
            }}
          />
          <View className='flex-row justify-between px-6 py-4 items-center bg-white w-full'>
            {cartItems.length > 0 
              ? (
                <View>
                  <Text className='font-semibold text-base text-gray-main'>Preço</Text>

                  <Text className='text-lg font-bold'>{formatCurrency(cartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0))}</Text>
                </View>
              ) : (
                <Text className='text-base font-semibold text-gray-main w-32 text-center'>Seu carrinho está vazio</Text>
              )}
            

            <Button disabled={cartItems.length < 1} onPress={onCreateOrder}>Confirmar Pedido</Button>
          </View>
        </View>
      )}
    </>
  );
}