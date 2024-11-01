import { Request, Response } from 'express';
import { ListUserNotification } from '../useCases/notifications/ListUserNotifications';
import { Types } from 'mongoose';
import { DeleteNotification } from '../useCases/notifications/DeleteNotification';
import { UpdateNotificationReadStatus } from '../useCases/notifications/UpdateNotificationReadStatus';
import { DeleteAllNotifications } from '../useCases/notifications/DeleteAllNotifications';

class NotificationsController {
  async index(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.user?._id);

      const notifications = await ListUserNotification(id);

      res.status(200).json(notifications);
    } catch {
      res.sendStatus(500);
    }
  }

  async changeReadStatus(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);

      const notification = await UpdateNotificationReadStatus(id);

      res.status(200).json(notification);
    } catch {
      res.sendStatus(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.params.id);

      const notification = await DeleteNotification(id);

      if(!notification) {
        res.status(400).json('Notification not found');
      }

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const id = new Types.ObjectId(req.user?._id);

      await DeleteAllNotifications(id);

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }
}

export default new NotificationsController();
