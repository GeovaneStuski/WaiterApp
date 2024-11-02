import { Text, View } from 'react-native';

import { Button } from '../../../../../components/Button';

import { formatCurrency } from '../../../../../utils/formatCurrency';

type FooterProps = {
  handleAddToCart: () => void;
  price: number;
}

export function Footer({ handleAddToCart, price }: FooterProps) {
  return (
    <View className='flex-row justify-between px-6 py-4 items-center bg-white w-full'>
      <View>
        <Text className='font-semibold text-base text-gray-main'>Preço</Text>

        <Text className='text-lg font-bold'>{formatCurrency(price)}</Text>
      </View>

      <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
    </View>
  );
}