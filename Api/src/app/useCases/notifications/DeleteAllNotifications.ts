import { Types } from 'mongoose';
import NotificationsRepository from '../../repositories/NotificationsRepository';

export async function DeleteAllNotifications(id: Types.ObjectId) {
  const notifications = await NotificationsRepository.deleteAll(id);

  return notifications;
}
