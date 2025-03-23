import { settings } from "@/settings";
import { createClient } from "redis";

const redisHost = settings.redisHost || "redis";
const redisPort = settings.redisPort || "6379";

export const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`,
});

(async () => {
  try {
    if (process.env.NODE_ENV !== "test") {
      redisClient.on("error", (err) => console.log("Redis Client Error", err));
      await redisClient.connect();
      console.log("Connected to Redis");
    } else {
      console.log("Skipping Redis connection in test environment");
    }
  } catch (error) {
    console.error("Error connecting to Redis:", error);
  }
})();
