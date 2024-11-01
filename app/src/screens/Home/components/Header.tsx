import { Text, TouchableOpacity, View } from 'react-native';
import { BellIcon } from '../../../components/icons/BellIcon';
import { useContext } from 'react';
import { OrderContext } from '../../../contexts/OrderContext';

type HeaderProps = {
  onOpenNotificationModal: () => void;
  haveANewNotification: boolean;
}

export function Header({ onOpenNotificationModal, haveANewNotification}: HeaderProps) {
  const { table, onCancelOrder, onOpenTableModal } = useContext(OrderContext);

  return (
    <View>
      {!table && (
        <View className='flex-row items-center justify-between'>
          <View>
            <Text className="text-sm text-black-main">Bem-vindo(a) ao</Text>
  
            <Text className="text-2xl font-bold text-black-main">
              WAITER
  
              <Text className="font-normal">APP</Text>
            </Text>
          </View>
  
          <TouchableOpacity
            className='w-11 h-11 justify-center items-center bg-white rounded-full shadow-md shadow-black/60'
            onPress={onOpenNotificationModal}
          >
            <BellIcon color='#333333' size={24}/>

            {haveANewNotification && (
              <View className='w-3 h-3 rounded-full bg-red-main absolute top-0 right-0.5'/>
            )}
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