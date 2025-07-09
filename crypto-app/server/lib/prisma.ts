import { PrismaClient } from "@prisma/client";
import { baseLogger } from "./logger";

const prisma = new PrismaClient();

export async function connectPrisma() {
  try {
    await prisma.$connect();
    baseLogger.info("✅ Успешно подключено к базе данных через Prisma");
  } catch (error) {
    baseLogger.error("❌ Ошибка при подключении к базе данных:", error);
    process.exit(1); // остановить приложение, если нет подключения
  }
}

export default prisma;
