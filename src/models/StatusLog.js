import camelize from 'camelize';
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

  static fetchAllLogs() {
    logger().info('Fetching all status logs');

    return db.knex
      .select([
        'status_logs.*',
        'services.name as service_name',
        'services.url as url',
        'statuses.name as status'
      ])
      .from('status_logs')
      .innerJoin('services', 'status_logs.service_id', 'services.id')
      .innerJoin('statuses', 'status_logs.status_id', 'statuses.id')
      .orderBy('created_at', 'DESC')
      .then(data => {
        logger().debug('Retrieved status logs: ', data);

        return camelize(data);
      });
  }

  static fetchLatestStatuses() {
    logger().info('Fetching the latest status');

    return db.knex
      .select([
        'status_logs.*',
        'services.name as service_name',
        'services.url as url',
        'statuses.name as status'
      ])
      .from('status_logs')
      .innerJoin('services', 'status_logs.service_id', 'services.id')
      .innerJoin('statuses', 'status_logs.status_id', 'statuses.id')
      .groupBy('status_logs.service_id')
      .orderBy('created_at', 'DESC')
      .then(data => {
        logger().debug('Retrieved the latest status logs: ', data);

        return camelize(data);
      });
  }
}

export default StatusLog;
