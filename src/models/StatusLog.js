import Status from './Status';
import Service from './Service';

import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();
const TABLE_NAME = 'status_logs';

class StatusLog extends db.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  service() {
    return this.belongsTo(Service);
  }

  status() {
    return this.belongsTo(Status);
  }

  static fetchServiceStatus(serviceId) {
    logger().info(`Fetching the latest status of service ${serviceId}`);

    return new StatusLog({ serviceId }).orderBy('created_at', 'DESC').fetch();
  }

  static fetchAllLogs(projectId) {
    logger().info('Fetching all status logs');

    return StatusLog.collection()
      .query(qb => qb.orderBy('created_at', 'DESC'))
      .fetch({
        debug: true,
        withRelated: ['status', 'service']
      })
      .where({ project_id: projectId })
      .then(collection => collection.toJSON());
  }

  static fetchLatestStatuses() {
    logger().info('Fetching the latest status');

    return StatusLog.collection()
      .query(qb => qb.groupBy('service_id').orderBy('created_at', 'DESC'))
      .fetch({
        debug: true,
        withRelated: ['status', 'service']
      })
      .then(collection => collection.toJSON());
  }
}

export default StatusLog;
