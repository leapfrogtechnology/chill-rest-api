import { getClient } from '../utils/db';

const db = getClient();

// Service types
export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';

class Service extends db.Model {
  get tableName() {
    return 'services';
  }

  get hasTimestamps() {
    return true;
  }
}

export default Service;
