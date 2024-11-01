import NotificationsRepository from '../../repositories/NotificationsRepository';

export async function CreateNotification(body: object) {
  const notifications = await NotificationsRepository.create(body);

  return notifications;
}
