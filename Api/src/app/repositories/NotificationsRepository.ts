import { Types } from 'mongoose';
import { Notification } from '../models/Notification';

export class NotificationsRepository {
  async list(userId: Types.ObjectId): Promise<object[]> {
    const notifications = await Notification.find({user: userId});

    return notifications;
  }

  async create(body: object): Promise<object> {
    const notification = await Notification.create(body);

    return notification;
  }

  async update(notificationId: Types.ObjectId): Promise<object | null> {
    const notification = await Notification.findByIdAndUpdate(notificationId, { seen: true }, { new: true });

    return notification;
  }

  async delete(id: Types.ObjectId): Promise<object | null> {
    const notification = await Notification.findByIdAndDelete(id);

    return notification;
  }

  async deleteAll(id: Types.ObjectId): Promise<object | null> {
    const notifications = await Notification.deleteMany({user: id});

    return notifications;
  }
}

export default new NotificationsRepository();
