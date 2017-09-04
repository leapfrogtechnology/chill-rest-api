import logger from '../utils/logger';
import { getClient } from '../utils/db';
import NotificationTypes from './NotificationTypes';

const db = getClient();

class Notification extends db.Model {
  get tableName() {
    return 'notification';
  }

  get hasTimestamps() {
    return true;
  }

  static async create(projectId) {
    let notificationTypes = await NotificationTypes.fetchAll();
    let length = notificationTypes.length;
    let notifications = notificationTypes.toJSON();

    try {
      logger().info('Creating notification table');
      for (let i = 1; i <= length; i++) {
        let notification = new Notification({
          project_id: projectId,
          enabled: false,
          notification_type: notifications[i - 1].type,
          config: notifications[i - 1].config
        });

        await notification.save();
      }
      logger().info('Notification table created');

      return 'notification table created';
    } catch (err) {
      logger().error(err);
    }
  }
}

export default Notification;
