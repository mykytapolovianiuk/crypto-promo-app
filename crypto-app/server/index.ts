import { startApiServer } from "./api/server";
import { startTelegramBot } from "./bot/bot";
import { baseLogger } from "./lib/logger";
import { connectPrisma } from "./lib/prisma";
import { checkRedisConnection } from "./lib/redis";

baseLogger.info("🚀 Запускаем backend приложение");

connectPrisma();
startApiServer();
startTelegramBot();
checkRedisConnection();
