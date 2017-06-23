import { getClient } from '../utils/db';

const db = getClient();

class StatusLog extends db.Model {

  get tableName() {
    return 'status_logs';
  }

  get hasTimestamps() {
    return true;
  }

  static fetchLatestStatuses() {
    return this
      .query(qb => qb.groupBy('name').orderBy('created_at', 'DSC'))
      .fetchAll();
  }
}

export default StatusLog;
