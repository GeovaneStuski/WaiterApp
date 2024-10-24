import { Text, TouchableOpacity, View } from 'react-native';
import { BellIcon } from './icons/BellIcon';
import { useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';

export function Header() {
  const { table, onCancelOrder, onOpenTableModal } = useContext(OrderContext);

  return (
    <View className='mt-6 px-6'>
      {!table && (
        <View className='flex-row items-center justify-between'>
          <View>
            <Text className="text-sm text-black-main">Bem-vindo(a) ao</Text>
  
            <Text className="text-2xl font-bold text-black-main">
              WAITER
  
              <Text className="font-normal">APP</Text>
            </Text>
          </View>
  
          <TouchableOpacity className='w-11 h-11 justify-center items-center bg-white rounded-full shadow-md shadow-black/60'>
            <BellIcon color='#333333' size={24}/>
          </TouchableOpacity>
        </View>
      )}

      {table && (
        <>
          <View className='justify-between items-center flex-row'>
            <Text className='text-2xl font-bold'>Pedidos</Text>

            <TouchableOpacity onPress={onCancelOrder}>
              <Text className='text-sm text-red-main font-bold'>Cancelar Pedido</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onOpenTableModal} className='w-full p-4 bg-white border border-gray-light/30 mt-4 rounded-lg'>
            <Text>Mesa {table}</Text>
          </TouchableOpacity>
        </>
      )} 
    </View>
  );
}