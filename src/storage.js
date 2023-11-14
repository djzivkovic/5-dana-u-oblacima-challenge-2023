import { Redis } from "ioredis";

const storage = new Redis({
    host: process.env.REDIS_HOST || "storage",
    port: process.env.REDIS_PORT || "6379"
});

export default storage;