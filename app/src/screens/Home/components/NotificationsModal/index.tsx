import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

import { useNotificationsModal } from './useNotificationsModal';

import { Header } from './components/Header';
import { Empty } from '../../../../components/Empty';
import { NotificationBody } from './components/NotificationBody';
import { DeleteButton } from './components/DeleteButton';

import { cn } from '../../../../utils/cn';
import { compareDates } from '../../../../utils/compareDates';
import { Notification } from '../../../../types/Notification';

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

  const {
    onClear,
    onDelete,
    onRead,
  } = useNotificationsModal({ notifications, onClearNotifications, onDeleteNotification, onReadNotification });

  return (
    <Modal visible={isVisible} animationType='slide'>
      <View className="flex-1 bg-[#fafafa] rounded-lg px-6 mt-6">
        <Header
          notifications={notifications}
          onClearNotifications={onClear}
          onCloseModal={onClose}
        />

        {notifications.length > 0 && (
          <FlatList
            data={notifications}
            style={{marginTop: 40,}}
            keyExtractor={notification => notification._id}
            renderItem={({ item: notification }) => {
              const {status, table} = notification.order;
              return (
                <TouchableOpacity 
                  onPress={() => onRead(notification._id)} 
                  className='bg-white rounded-lg items-center justify-between p-4 flex-row'>
                  <NotificationBody
                    notification={notification}
                    status={status}
                    table={table}
                  />

                  {notification.seen && (
                    <DeleteButton onDeleteNotification={() => onDelete(notification._id)} />
                  )}

                  {!notification.seen && <View className='p-1 bg-red-main rounded-full'/>}

                  <Text className={cn('text-xs text-gray-main absolute right-10 bottom-4', {
                    'opacity-50 right-16': notification.seen,
                  })}
                  >{compareDates(notification.sentAt)}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}

        {notifications.length < 1 && <Empty label='Você não possui nenhuma notificação no momento'/>}
      </View>
    </Modal>
  );
}