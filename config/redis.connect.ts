import { createClient } from 'redis';
import { config } from '.';
import { logger } from '../helpers/logger';

const redisClient = createClient({
  url: config.redisUrl,
});

redisClient.on('connect', () => {
  logger.info('Redis client connected');
});

redisClient.on('error', (e) => {
  logger.info('Redis error: ', e);
});

redisClient.connect();

export { redisClient };