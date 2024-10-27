import { FlatList, Text, View } from 'react-native';
import { Status } from './Status';
import { CartItem } from '../../../types/CartItem';

type OrderCardProps = {
  table: string;
  status: 'IN_PRODUCTION' | 'DONE' | 'WAITING' | 'FINISHED';
  products: CartItem[];
  date?: string;
}

export function OrderCard({ table, status, products, date }: OrderCardProps) {
  return (
    <View className='w-full bg-white rounded-lg p-6 mb-2'>
      <View className='flex-row justify-between items-center'>
        <Text className='font-semibold text-base'>Mesa {table}</Text>
            
        <Status date={date} status={status} />
      </View>

      <FlatList
        data={products}
        style={{marginTop: 20}}
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
  );
}