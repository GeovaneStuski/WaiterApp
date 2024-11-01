import { Types } from 'mongoose';
import NotificationsRepository from '../../repositories/NotificationsRepository';

export async function ListUserNotification(id: Types.ObjectId) {
  const notifications = await NotificationsRepository.list(id);

  return notifications;
}
