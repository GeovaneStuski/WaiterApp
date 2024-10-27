import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { ArrowIcon } from '../../../components/icons/ArrowIcon';
import { useState } from 'react';
import { Empty } from '../../../components/Empty';
import { cn } from '../../../utils/cn';

type NotificationsModalProps = {
  isVisible: boolean;
  onClose: () => void;
}

type Notification = {
  id: string;
  table: number;
  status: string;
  icon: string;
  createdAt: string;
  seen: boolean;
}

export function NotificationsModal({ isVisible, onClose }: NotificationsModalProps) {
  const [notifications] = useState<Notification[]>([{
    id: Math.random().toString(),
    createdAt: 'Hoje',
    icon: '‍‍👩‍🍳',
    status: 'IN_PRODUCTION',
    table: 12,
    seen: false,
  },
  {
    id: Math.random().toString(),
    createdAt: 'Hoje',
    icon: '‍‍👩‍🍳',
    status: 'IN_PRODUCTION',
    table: 12,
    seen: true,
  }]);
  return (
    <Modal visible={isVisible} animationType='slide'>
      <View className="flex-1 bg-[#fafafa] rounded-lg px-6 mt-6">
        <View className='flex-row items-center'>
          <TouchableOpacity onPress={onClose}>
            <ArrowIcon size={32} color='#333333'/>
          </TouchableOpacity>

          <Text className='text-2xl font-bold ml-4'>Notifications</Text>
        </View>

        {notifications.length > 0 && (
          <FlatList
            data={notifications}
            style={{marginTop: 40,}}
            keyExtractor={notification => notification.id}
            renderItem={({ item: notification }) => (
              <View className={cn('bg-white rounded-lg items-center justify-between p-4 flex-row', {
                'opacity-60': notification.seen
              })}>
                <View className='flex-row items-center'>
                  <View className='bg-[#fafafa] w-8 h-8 rounded-full items-center justify-center'>
                    <Text className='text-base'>{notification.icon}</Text>
                  </View>

                  <View className='ml-4'>
                    <Text className='text-sm text-black-main font-semibold'>Mesa {notification.table}</Text>

                    <Text className='text-xs text-gray-main mt-0.5'>{notification.status.toLowerCase()}</Text>
                  </View>
                </View>

                <View className='p-1 bg-red-main rounded-full'/>
              </View>
            )}
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