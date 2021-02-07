
const redistPool = require('redis');

const redisConn = require('./redisConn');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'local';
const redis = redisConn[env];
const redisClient = redistPool.createClient(
  {
    host: '0.0.0.0',
    port: redis.port,
    db: redis.db,
    auth_pass: redis.auth_pass
  }
);

module.exports = redisClient;
