import { Text, View } from 'react-native';

import { NotificationsButton } from './NotificationButton';

type WithoutTableProps = {
  haveANewNotification: boolean;
  onOpenNotificationModal: () => void;
}

export function WithoutTable({ haveANewNotification, onOpenNotificationModal }: WithoutTableProps) {
  return (
    <View className='flex-row items-center justify-between'>
      <View>
        <Text className="text-sm text-black-main">Bem-vindo(a) ao</Text>
  
        <Text className="text-2xl font-bold text-black-main">
          WAITER
          <Text className="font-normal">APP</Text>
        </Text>
      </View>
  
      <NotificationsButton 
        haveANewNotification={haveANewNotification}
        onOpenNotificationModal={onOpenNotificationModal}
      />
    </View>
  );
}