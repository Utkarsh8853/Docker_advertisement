import Redis from "ioredis";
import { createClient } from "redis";

const client = new Redis({
    host: '192.168.2.175',
    port: 6379,
  }); 
// const client = createClient();
// client.on("error", (err) => console.log("Redis Client Error", err));
// client.connect();

export default client;


class RedisService {
    private client: any;
    constructor() {
        const options = { 
        }
        this.client = createClient(options);
             
    }


    async set(){
        const setInRedis = this.client
    }
}