import { Telegraf } from "telegraf";
import { BOT_TOKEN } from "../lib/constants";
import { loggerBot } from "../lib/logger";

export const bot = new Telegraf(BOT_TOKEN);

export async function startTelegramBot() {
  try {
    loggerBot.info("🔄 Запуск Telegram бота...");

    // Сначала получаем информацию о боте
    const botInfo = await bot.telegram.getMe();
    loggerBot.info(
      `🤖 Информация о боте: ${botInfo.first_name} (@${botInfo.username})`
    );

    // Запускаем бота
    await bot.launch();

    loggerBot.info(`✅ Telegram бот успешно запущен!`);

    // Обработчик graceful shutdown
    process.once("SIGINT", () => {
      loggerBot.info("🛑 Получен сигнал SIGINT. Останавливаем бота...");
      bot.stop("SIGINT");
    });

    process.once("SIGTERM", () => {
      loggerBot.info("🛑 Получен сигнал SIGTERM. Останавливаем бота...");
      bot.stop("SIGTERM");
    });
  } catch (error) {
    loggerBot.error("❌ Ошибка при запуске Telegram бота:", error);
    throw error; // Пробрасываем ошибку дальше
  }
}

// Обработчики ошибок для бота
bot.catch((err, ctx) => {
  loggerBot.error(`❌ Ошибка в боте для пользователя ${ctx.from?.id}:`, err);
});
