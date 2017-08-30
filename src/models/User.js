import logger from '../utils/logger';
import { getClient } from '../utils/db';

const db = getClient();

export const TYPE_HTTP = 'http';
export const TYPE_TCP = 'tcp';


class User extends db.Model {
  get tableName() {
    return 'users';
  }

  get hasTimestamps() {
    return true;
  }

  static async create(data) {
    let Username = data.email.split('@')[0];
    let user = new User({
      name: data.name,
      email: data.email,
      image: data.image,
      username: Username,
      google_id: data.id
    });
    

    logger().info('Creating a new user');
    logger().debug('User data', data);

    await user.save();

    logger().info('user created', { id: user.get('id') });
    
    return user;
  }
}


export default User;
