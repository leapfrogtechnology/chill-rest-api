import { getClient } from '../utils/db';

const db = getClient();

class Status extends db.Model {
  get tableName() {
    return 'statuses';
  }

  static async create(data) {}

  get hasTimestamps() {
    return true;
  }
}

export default Status;
