require('dotenv').config();

/**
 * Database configuration.
 */
module.exports = {
  client: process.env.DB_CLIENT,
  connection: {
    filename: process.env.DB_FILE,
  }
};
