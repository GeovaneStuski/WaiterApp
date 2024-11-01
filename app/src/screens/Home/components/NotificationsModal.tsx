import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ArrowIcon } from '../../../components/icons/ArrowIcon';
import { Empty } from '../../../components/Empty';
import { cn } from '../../../utils/cn';
import { compareDates } from '../../../utils/compareDates';
import { Notification } from '../../../types/Notification';
import { ApiRequest } from '../../../utils/ApiRequest';
import { TrashIcon } from '../../../components/icons/TrashIcon';

type NotificationsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onReadNotification: (notificationId: string) => void;
  onDeleteNotification: (notificationId: string) => void;
  onClearNotifications: () => void;
}

export function NotificationsModal({
  isVisible,
  onClose,
  notifications,
  onReadNotification,
  onDeleteNotification,
  onClearNotifications
}: NotificationsModalProps) {

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

  async function handleReadNotification(id: string) {
    if(notifications.find(notification => notification._id === id)?.seen) {
      return;
    }
    
    try {
      await ApiRequest({
        endPoint: `/notifications/${id}`,
        method: 'patch',
      });
    } catch {
      //
    }

    onReadNotification(id);
  }

  async function handleDeleteNotification(id: string) {
    try {
      await ApiRequest({
        endPoint: `/notifications/${id}`,
        method: 'delete',
      });
    } catch {
      //
    }

    onDeleteNotification(id);
  }

  async function handleClearNotfications() {
    try {
      await ApiRequest({
        endPoint: '/notifications/all',
        method: 'delete',
      });
    } catch {
      //
    }

    onClearNotifications();
  }

  return (
    <Modal visible={isVisible} animationType='slide'>
      <View className="flex-1 bg-[#fafafa] rounded-lg px-6 mt-6">
        <View className='flex-row items-center justify-between'>
          <View className='flex-row items-center'>
            <TouchableOpacity onPress={onClose}>
              <ArrowIcon size={32} color='#333333'/>
            </TouchableOpacity>

            <Text className='text-2xl font-bold ml-4'>Notifications</Text>
          </View>

          {notifications.length > 0 && (
            <TouchableOpacity onPress={handleClearNotfications}>
              <Text className='text-red-main font-semibold'>Excluir Notificações</Text>
            </TouchableOpacity>
          )} 
        </View>

        {notifications.length > 0 && (
          <FlatList
            data={notifications}
            style={{marginTop: 40,}}
            keyExtractor={notification => notification._id}
            renderItem={({ item: notification }) => {
              const {status, table} = notification.order;
              return (
                <TouchableOpacity onPress={() => handleReadNotification(notification._id)} className={cn('bg-white rounded-lg items-center justify-between p-4 flex-row')}>
                  <View className={cn('flex-row items-center', {
                    'opacity-50': notification.seen
                  })}>
                    <View className='bg-[#fafafa] w-8 h-8 rounded-full items-center justify-center'>
                      <Text className='text-base'>{statusVariables[notification.order.status].icon}</Text>
                    </View>
  
                    <View className='ml-4'>
                      <Text className='text-sm text-black-main font-semibold'>Mesa {table}</Text>
  
                      <Text className='text-xs text-gray-main mt-1.5'>{statusVariables[status].message}</Text>
                    </View>
                  </View>
  
                  {notification.seen ? (
                    <TouchableOpacity onPress={() => handleDeleteNotification(notification._id)}>
                      <TrashIcon size={20} color='#D73035' />
                    </TouchableOpacity>
                  ) : (
                    <View className='p-1 bg-red-main rounded-full'/>
                  )}

                  <Text className={cn('text-xs text-gray-main absolute right-10 bottom-4', {
                    'opacity-50 right-16': notification.seen,
                  })}>{compareDates(notification.sentAt)}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {notifications.length < 1 && (
          <View className='flex-1 items-center justify-center'>
            <Empty/>

            <Text className='text-base font-semibold text-gray-main text-center mt-6'>Você não possui nenhuma notificação no momento</Text>
          </View>
        )}
      </View>
    </Modal>
  );
}