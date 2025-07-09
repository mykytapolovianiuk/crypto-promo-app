import Redis from "ioredis";
import { redisOptions } from "./constants";
import { baseLogger } from "./logger";

export const redis = new Redis(redisOptions);

export async function checkRedisConnection() {
  try {
    const pong = await redis.ping();
    if (pong === "PONG") {
      baseLogger.info("✅ Redis подключен");
    } else {
      baseLogger.warn(`⚠️ Redis вернул неожиданный ответ: ${pong}`);
    }
  } catch (err) {
    baseLogger.error("❌ Redis не подключен:", err);
    throw err; // можно прервать запуск приложения, если критично
  }
}
