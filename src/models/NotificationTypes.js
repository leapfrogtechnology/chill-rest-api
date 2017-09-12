import Boom from 'Boom';
import camelize from 'camelize';

import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();

class NotificationTypes extends db.Model {
  get tableName() {
    return 'notification_types';
  }

  get hasTimestamps() {
    return true;
  }

  static async fetch(id) {
    try {
      let result = await NotificationTypes.where({ id }).fetch();

      return camelize(result.attributes);
    } catch (err) {
      return new Boom.notFound('no entry found of the id');
    }
  }

  static async fetchAll() {
    logger().info('Fetching all notification types');
    let result = await NotificationTypes.forge()
      .orderBy('id', 'ASC')
      .fetchAll();

    return result;
  }
}

export default NotificationTypes;
