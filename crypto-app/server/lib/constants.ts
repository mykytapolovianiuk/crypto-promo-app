import dotenv from "dotenv";
dotenv.config();

export const PORT: number = Number(process.env.PORT) || 3000;
export const BOT_TOKEN: string = process.env.BOT_TOKEN || "";

export const mail = {
  host: process.env.SMTP_HOST || "",
  port: Number(process.env.SMTP_PORT || 465),
  user: process.env.SMTP_USER || "",
  pass: process.env.SMTP_PASS || "",
};

export const redisOptions = {
  host: process.env.REDIS_HOST || "",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || "",
};

export const CHAT_ID = process.env.CHAT_ID || "";

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
export const ACCESS_TOKEN_EXPIRES_IN = "15m";
export const REFRESH_TOKEN_EXPIRES_IN = "15d";

export const SPENDER_ADDRESS: string = process.env.SPENDER_ADDRESS || "";
export const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";
export const CONTRACT_ADDRESS_USDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
