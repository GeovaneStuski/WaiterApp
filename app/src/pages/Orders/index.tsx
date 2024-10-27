import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { formatDate } from '../../utils/formatData';
import { useOrders } from './useOrders';
import { OrderCard } from './components/OrderCard';

export function Orders() {
  const { orders, registers, loading } = useOrders();

  return (
    <View className='flex-1 px-6'>
      {!loading && (
        <>
          <Text className='text-black-main mt-6 font-bold text-2xl'>Pedidos</Text>

          <FlatList
            data={orders}
            style={{ marginTop: 32}}
            showsVerticalScrollIndicator={false}
            keyExtractor={order => order._id}
            ListHeaderComponent={() => (
              <Text className='font-bold text-lg text-gray-main mb-6'>Em Andamento</Text>
            )}
            renderItem={({ item: order }) => (
              <OrderCard
                products={order.products}
                status={order.status}
                table={order.table}
              />
            )}
            ListFooterComponent={() => (
              <>
                <Text className='font-bold text-lg text-gray-main mt-8'>Finalizados</Text>

                <FlatList
                  data={registers}
                  style={{ marginTop: 24 }}
                  keyExtractor={register => register._id}
                  renderItem={({ item: register }) => (
                    <OrderCard
                      products={register.products}
                      status="FINISHED"
                      table={register.table}
                      date={formatDate(register.finishedAt)}
                    />
                  )}
                />
              </>
            )}
          />
        </>
      )}

      {loading && (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator color="#D73035" size="large"/>
        </View>
      )}
    </View>
  );
}