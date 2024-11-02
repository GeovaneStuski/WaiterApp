import { Text, View } from 'react-native';

import { Product } from '../../../../../types/Product';
import { formatCurrency } from '../../../../../utils/formatCurrency';

type CartDetailsProps = {
  quantity: number;
  product: Product;
}

export function CartDetails({ product, quantity }: CartDetailsProps) {
  return (
    <View className='flex-row items-start ml-3'>
      <Text className='text-sm text-gray-main/70'>{quantity}x</Text>
  
      <View className='ml-3'>
        <Text className='text-sm font-bold'>{product.name}</Text>
  
        <Text className='text-sm text-gray-main mt-1'>{formatCurrency(product.price)}</Text>
      </View>
    </View>
  );
}