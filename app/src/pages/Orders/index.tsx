import { FlatList, Text, View } from 'react-native';
import { Status } from './components/Status';
import { formatData } from '../../utils/formatData';
import { useOrders } from './useOrders';

export function Orders() {
  const { orders, registers } = useOrders();

  return (
    <FlatList
      style={{paddingHorizontal: 24, marginTop: 24}}
      ListHeaderComponent={
        <>
          <Text className='text-2xl font-bold text-black-main'>Pedidos</Text>

          <View className='mt-10'>
            <Text className='text-lg text-gray-main font-bold'>Em Andamento</Text>
          </View>
        </>
      }
      data={orders.filter(({ status }) => status !== 'WAITING')}
      showsVerticalScrollIndicator={false}
      keyExtractor={(order) => order._id}
      renderItem={({ item: order }) => (
        <View className='w-full bg-white rounded-lg p-6 mb-2'>
          <View className='flex-row justify-between items-center'>
            <Text className='font-semibold text-base'>Mesa {order.table}</Text>
            <Status status={order.status} />
          </View>

          <View className='mt-4'>
            <FlatList
              data={order.products}
              keyExtractor={({ product }) => product._id}
              ItemSeparatorComponent={() => <View className='h-2' />}
              renderItem={({ item }) => {
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
      ListFooterComponent={
        <View className='mt-10'>
          <Text className='text-lg text-gray-main font-bold'>Anteriores</Text>

          <FlatList
            data={registers}
            showsVerticalScrollIndicator={false}
            keyExtractor={(register) => register._id}
            renderItem={({ item: register }) => (
              <View className='w-full bg-white rounded-lg p-6 mb-2'>
                <View className='flex-row justify-between items-center'>
                  <Text className='font-semibold text-base'>Mesa {register.table}</Text>
                  <Status date={formatData(register.finishedAt)} status='FINISHED' />
                </View>

                <View className='mt-4'>
                  <FlatList
                    data={register.products}
                    keyExtractor={({ product }) => product._id}
                    ItemSeparatorComponent={() => <View className='h-2' />}
                    renderItem={({ item }) => {
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
      }
    />
  );
}