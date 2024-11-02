import { Text, TouchableOpacity, View } from 'react-native';

type WithTableProps = {
  onCancelOrder: () => void;
  onOpenTableModal: () => void;
  table: string
}

export function WithTable({ onCancelOrder, onOpenTableModal, table }: WithTableProps) {
  return (
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
  );
}