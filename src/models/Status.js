import bookshelf from '../db';

const TABLE_NAME = 'status_changes';

class Status extends bookshelf.Model {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  static fetchLatestStatuses() {
    return this.query(qb => qb.groupBy('name') .orderBy('created_at', 'DSC'))
               .fetchAll();
  }
}

export default Status;
