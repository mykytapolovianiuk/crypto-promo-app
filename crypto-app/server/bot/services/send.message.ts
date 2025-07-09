import { CHAT_ID } from "../../lib/constants";
import { loggerBot } from "../../lib/logger";
import { bot } from "../bot";

export async function sendMessage(text: string) {
  try {
    await bot.telegram.sendMessage(CHAT_ID, text, {
      parse_mode: "HTML",
    });
    loggerBot.info(`Сообщение отправлено в чат`);
  } catch (err) {
    loggerBot.error(`Ошибка при отправке сообщения: ${err}`);
    throw err;
  }
}
