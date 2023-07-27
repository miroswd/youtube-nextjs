import { createClient } from "redis";

const { REDIS_URL, REDIS_PASS, REDIS_PORT } = process.env

const redis = createClient({
  password: REDIS_PASS,
  socket: {
    host: REDIS_URL,
    port: Number(REDIS_PORT),
  },
});


redis.connect().then((_) => {
  console.log('Redis connected');
}).catch((err) => {
  console.log(err, 'Failed to connect redis');
});


export { redis }