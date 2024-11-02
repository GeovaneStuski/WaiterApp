import { TouchableOpacity, View } from 'react-native';

import { AddIcon } from '../../../../../components/icons/AddIcon';
import { LessIcon } from '../../../../../components/icons/LessIcon';

import { Product } from '../../../../../types/Product';

type CartActionsProps = {
  onAddProductToCart: (product: Product) => void;
  onDecrementProductFromCart: (product: Product) => void;
  product: Product;
}

export function CartActions({ onAddProductToCart, onDecrementProductFromCart, product }: CartActionsProps) {
  return (
    <View className='flex-row items-center justify-between w-16'>
      <TouchableOpacity onPress={() => onAddProductToCart(product)}>
        <AddIcon color='#D73035' size={24}/>
      </TouchableOpacity>
  
      <TouchableOpacity onPress={() => onDecrementProductFromCart(product)}>
        <LessIcon color='#D73035' size={24}/>
      </TouchableOpacity>
    </View>
  );
}