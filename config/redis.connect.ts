import { createClient } from 'redis';
import dotenv from 'dotenv';
import { config } from '.';

dotenv.config();

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (e) => {
  console.log('Redis error: ', e);
});

redisClient.connect();

export { redisClient };