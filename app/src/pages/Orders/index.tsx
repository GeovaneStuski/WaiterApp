import { useState } from 'react';
import { FlatList, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { api } from '../../utils/api';
import { Order } from '../../types/Order';
import { Status } from './components/Status';
import { useFocusEffect } from '@react-navigation/native';

const isAndroid = Platform.OS === 'android';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useFocusEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-6" style={{marginTop: isAndroid ? StatusBar.currentHeight : 0}}>
      <Text className='mt-5 text-2xl font-bold text-black-main'>Pedidos</Text>

      <View className='flex-1 mt-10'>
        <Text className='text-lg text-gray-main font-bold'>Em Andamento</Text>

        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          style={{marginTop: 24}}
          keyExtractor={order => order._id}
          renderItem={({item: order}) => (
            <View className='w-full bg-white rounded-lg p-6 mb-2'>
              <View className='flex-row justify-between items-center'>
                <Text className='font-semibold text-base'>Mesa {order.table}</Text>

                <Status status={order.status}/>
              </View>

              <View className='mt-4'>
                <FlatList
                  data={order.products}
                  keyExtractor={({product}) => product._id}
                  ItemSeparatorComponent={() => <View className='h-2'/>}
                  renderItem={({item}) => {
                    const quantity = item.quantity;
                    const product = item.product;
                    return (
                      <View className='flex-row items-center'>
                        <Text className='text-sm text-gray-main/60'>{quantity}x</Text>

                        <Text className='ml-2 text-sm text-black-main'>{product.name}</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}