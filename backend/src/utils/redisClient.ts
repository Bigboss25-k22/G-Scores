import { createClient, RedisClientType } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client: RedisClientType = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

client.on('error', (err: Error) => console.log('Redis Client Error', err));

client.connect();

export default client; 