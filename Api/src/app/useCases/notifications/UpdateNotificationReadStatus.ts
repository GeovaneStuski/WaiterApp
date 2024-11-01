import { Types } from 'mongoose';
import NotificationsRepository from '../../repositories/NotificationsRepository';

export async function UpdateNotificationReadStatus(id: Types.ObjectId) {
  const notification = await NotificationsRepository.update(id);

  return notification;
}
