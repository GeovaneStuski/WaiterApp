import { Text, View } from 'react-native';

type NotificationDetailsProps = {
  table: string;
  status: 'IN_PRODUCTION' | 'DONE'
}

export function NotificationDetails({ table, status }: NotificationDetailsProps) {
  const statusVariables = {
    'IN_PRODUCTION': {
      icon: '👩🏻‍🍳',
      message: 'Entrou em produção'
    },
    DONE: {
      icon: '✅',
      message: 'Pedido pronto'
    },
  };

  return (
    <View className='ml-4'>
      <Text className='text-sm text-black-main font-semibold'>Mesa {table}</Text>
  
      <Text className='text-xs text-gray-main mt-1.5'>{statusVariables[status].message}</Text>
    </View>
  );
}