import pino from "pino";

export const baseLogger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname,label", // игнорируем label, чтобы не показывать отдельно
      messageFormat: "{label} {msg}", // вставляем label в строку
    },
  },
});

// Используем label вместо context
export const loggerApi = baseLogger.child({ label: "[API]" });
export const loggerBot = baseLogger.child({ label: "[BOT]" });
