import { Types } from 'mongoose';
import NotificationsRepository from '../../repositories/NotificationsRepository';

export async function DeleteNotification(id: Types.ObjectId) {
  const notification = await NotificationsRepository.delete(id);

  return notification;
}
