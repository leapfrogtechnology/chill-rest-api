import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();

class Token extends db.Model {
  get tableName() {
    return 'tokens';
  }

  get hasTimestamps() {
    return true;
  }

  /**
  * Create a new Token entry.
  *
  * @param  {Object} data
  * @return {Promise}
  */
  static async create(data) {
    let token = new Token({
      user_id: data.userId,
      refresh_token: data.refreshToken    
    });

    logger().info('Creating a new token entry');
    logger().debug('New Token entry', data);

    await token.save();
    
    logger().info('Token entered', { id: token.get('id') });

    return token;
  }
}
export default Token;
