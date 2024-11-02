import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { formatDate } from '../../utils/formatData';
import { useOrders } from './useOrders';
import { OrderCard } from './components/OrderCard';
import { Empty } from '../../components/Empty';

export function Orders() {
  const { orders, loading } = useOrders();

  return (
    <View className='flex-1 px-6'>
      {!loading && (
        <>
          <Text className='text-black-main mt-6 font-bold text-2xl'>Pedidos</Text>

          {orders.length > 0 ? (
            <FlatList
              data={orders.filter(order => order.status !== 'FINISHED')}
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
                    data={orders.filter(order => order.status === 'FINISHED')}
                    style={{ marginTop: 24 }}
                    keyExtractor={register => register._id}
                    renderItem={({ item: register }) => (
                      <OrderCard
                        products={register.products}
                        status="FINISHED"
                        table={register.table}
                        date={formatDate(register.finishedAt!)}
                      />
                    )}
                  />
                </>
              )}
            />
          ) : (
            <View className='flex-1 justify-center items-center'>
              <Empty/>

              <Text className='mt-2 text-base font-semibold text-gray-main/80'>Nem um pedido em andamento</Text>
            </View>
          )}
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