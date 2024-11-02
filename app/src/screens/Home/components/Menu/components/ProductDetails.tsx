import { Text, View } from 'react-native';

import { formatCurrency } from '../../../../../utils/formatCurrency';
import { Product } from '../../../../../types/Product';

type ProductDetailsProps = {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <View className='ml-4 flex-1 justify-center'>
      <Text className='text-base font-bold text-black-main'>{product.name}</Text>

      <Text className='text-sm text-gray-main my-1'>{product.description}</Text>

      <Text className='text-base font-bold text-black-main'>{formatCurrency(product.price)}</Text>
    </View>
  );
}