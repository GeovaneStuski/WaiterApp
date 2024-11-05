import { FlatList, Text, View } from 'react-native';

import { useOrders } from './useOrders';

import { OrderCard } from './components/OrderCard';
import { Empty } from '../../components/Empty';
import { Loader } from '../../components/Loader';

import { formatDate } from '../../utils/formatData';

export function Orders() {
  const { orders, loading } = useOrders();

  return (
    <View className='flex-1 px-6'>
      {!loading && (
        <>
          <Text className='text-black-main mt-6 font-bold text-2xl'>Pedidos</Text>

          {orders.length > 0 && (
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
                <FlatList
                  data={orders.filter(order => order.status === 'FINISHED')}
                  style={{ marginTop: 24 }}
                  ListHeaderComponent={() => <Text className='font-bold text-lg text-gray-main mt-8 mb-6'>Finalizados</Text>}
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
              )}
            />
          )}

          {orders.length < 1 && (
            <Empty label='Nenhum Pedido em andamento!'/>
          )}
        </>
      )}

      {loading && <Loader/>}

    </View>
  );
}