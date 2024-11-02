import { useContext } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

import { OrderContext } from '../../../../contexts/OrderContext';

import { Button } from '../../../../components/Button';
import { ConfirmOrderModal } from '../ConfirmOrderModal';
import { CartActions } from './components/CartActions';
import { CartDetails } from './components/CartDetails';

import { formatCurrency } from '../../../../utils/formatCurrency';
import { getImageByPath } from '../../../../utils/getImageByPath';

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

      {table && (
        <View>
          <FlatList
            data={cartItems}
            style={{ maxHeight: 96 }}
            keyExtractor={({product}) => product._id}
            renderItem={({item}) => {
              const product = item.product;
              const quatity = item.quantity;

              return (
                <View className='w-full flex-row py-2.5 px-6 bg-white items-center justify-between'>
                  <View className='flex-row items-center'>
                    <Image className='w-14 h-10 rounded-lg' source={{uri: getImageByPath(product.imagePath)}}/>
  
                    <CartDetails
                      product={product}
                      quantity={quatity}
                    />
                  </View>
  
                  <CartActions
                    product={product}
                    onAddProductToCart={onAddProductToCart}
                    onDecrementProductFromCart={onDecrementProductFromCart}
                  />
                </View> 
              );
            }}
          />

          <View className='flex-row justify-between px-6 py-4 items-center bg-white w-full'>
            {cartItems.length > 0 && (
              <View>
                <Text className='font-semibold text-base text-gray-main'>Preço</Text>

                <Text className='text-lg font-bold'>{formatCurrency(cartItems.reduce((acc, { product, quantity }) => acc + product.price * quantity, 0))}</Text>
              </View>
            )}

            {cartItems.length < 1 && (
              <Text className='text-base font-semibold text-gray-main w-32 text-center'>Seu carrinho está vazio</Text>
            )}
            
            <Button disabled={cartItems.length < 1} onPress={onCreateOrder}>Confirmar Pedido</Button>
          </View>
        </View>
      )}
    </>
  );
}