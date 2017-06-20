import { getClient } from '../utils/db';
import logger from '../utils/logger';

const db = getClient();
const TABLE_NAME = 'status_logs';

class StatusLog extends db.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  static fetchLatestStatuses() {
    logger().info('Fetching status logs');

    return db.knex
      .select('status_logs.*', 'services.name as service_name', 'statuses.name as status')
      .from('status_logs')
      .innerJoin('services', 'status_logs.service_id', 'services.id')
      .innerJoin('statuses', 'status_logs.status_id', 'statuses.id')
      .groupBy('status_logs.service_id')
      .orderBy('created_at', 'DESC')
      .then(data => {
        logger().debug('Fetched status logs: ', data);

        return data;
      });
  }
}

export default StatusLog;
