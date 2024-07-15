import { Redis } from 'ioredis';
import env from '../env';

const redisUri = () => {
  if (env.REDIS_URI) {
    return env.REDIS_URI;
  }

  throw new Error('Failed to connect Redis.');
};

const redisClient = new Redis(redisUri(), {
  maxRetriesPerRequest: null,
});

export default redisClient;
