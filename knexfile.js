require('babel-register');

const config = require('./src/config/config');
const dbConfig = config.resolve(process.env.CHILL_CONFIG).db;

module.exports = Object.assign({}, dbConfig, {
  migrations: {
    directory: './src/migrations'
  }
});

