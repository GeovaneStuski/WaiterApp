import { TouchableOpacity, View } from 'react-native';

import { BellIcon } from '../../../../../components/icons/BellIcon';

type NotificationsButtonProps = {
  haveANewNotification: boolean;
  onOpenNotificationModal: () => void;
}

export function NotificationsButton({ haveANewNotification, onOpenNotificationModal }: NotificationsButtonProps) {
  return (
    <TouchableOpacity
      className='w-11 h-11 justify-center items-center bg-white rounded-full shadow-md shadow-black/60'
      onPress={onOpenNotificationModal}
    >
      <BellIcon color='#333333' size={24}/>

      {haveANewNotification && <View className='w-3 h-3 rounded-full bg-red-main absolute top-0 right-0.5'/> }
    </TouchableOpacity>
  );
}