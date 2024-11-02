import { Text, TouchableOpacity, View } from 'react-native';

import { ArrowIcon } from '../../../../../components/icons/ArrowIcon';

import { Notification } from '../../../../../types/Notification';

type HeaderProps = {
  notifications: Notification[];
  onCloseModal: () => void;
  onClearNotifications: () => void;
}

export function Header({ notifications, onClearNotifications, onCloseModal }: HeaderProps) {
  return (
    <View className='flex-row items-center justify-between'>
      <View className='flex-row items-center'>
        <TouchableOpacity onPress={onCloseModal}>
          <ArrowIcon size={32} color='#333333'/>
        </TouchableOpacity>

        <Text className='text-2xl font-bold ml-4'>Notifications</Text>
      </View>

      {notifications.length > 0 && (
        <TouchableOpacity onPress={onClearNotifications}>
          <Text className='text-red-main font-semibold'>Excluir Notificações</Text>
        </TouchableOpacity>
      )} 
    </View>
  );
}