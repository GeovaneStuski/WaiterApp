import { ApiRequest } from '../../../../utils/ApiRequest';
import { Notification } from '../../../../types/Notification';

type useNotificationsModalProps = {
  notifications: Notification[];
  onReadNotification: (notificationId: string) => void;
  onDeleteNotification: (notificationId: string) => void;
  onClearNotifications: () => void;
}

export function useNotificationsModal({ notifications, onClearNotifications, onDeleteNotification, onReadNotification }: useNotificationsModalProps) {
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
  return {
    onRead: handleReadNotification,
    onDelete: handleDeleteNotification,
    onClear: handleClearNotfications,
  };
}