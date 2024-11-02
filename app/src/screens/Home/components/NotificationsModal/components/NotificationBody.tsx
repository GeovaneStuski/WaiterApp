import { Text, View } from 'react-native';

import { cn } from '../../../../../utils/cn';
import { Notification } from '../../../../../types/Notification';
import { NotificationDetails } from './NotificationDetails';

type NotificationBodyProps = {
  notification: Notification;
  status: 'IN_PRODUCTION' | 'DONE';
  table: string;
}

export function NotificationBody({notification, status, table}: NotificationBodyProps) {
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
    <View className={cn('flex-row items-center', {
      'opacity-50': notification.seen
    })}>
      <View className='bg-[#fafafa] w-8 h-8 rounded-full items-center justify-center'>
        <Text>{statusVariables[notification.order.status].icon}</Text>
      </View>

      <NotificationDetails status={status} table={table} />
    </View>
  );
}