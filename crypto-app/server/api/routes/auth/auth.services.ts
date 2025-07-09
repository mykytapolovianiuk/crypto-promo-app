import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { RefreshInput, UserInput, VerifCodeInput } from "../../../@types/auth";
import { sendMessage } from "../../../bot/services/send.message";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
} from "../../../lib/constants";
import { loggerApi } from "../../../lib/logger";
import prisma from "../../../lib/prisma";
import { redis } from "../../../lib/redis";
import { loginMessage, registerMessage } from "../../constants/bot.messages";

export class AuthService {
  static async login(data: UserInput, ip: string) {
    try {
      const { email, password } = data;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        loggerApi.warn(`Пользователь не найден ${email}`);
        throw new Error("user not found");
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        loggerApi.warn(`Неверный пароль ${email}`);
        throw new Error("password decline");
      }

      const access_token = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      });

      const refresh_token = jwt.sign(
        { userId: user.id },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
      );

      await prisma.sessions.create({
        data: {
          userId: user.id,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        },
      });
      const textMessage = await loginMessage(email, ip);
      await sendMessage(textMessage);
      return { access_token, refresh_token };
    } catch (err) {
      loggerApi.error(`Ошибка при логине: ${err}`);
      throw err;
    }
  }

  static async createRegister(data: UserInput) {
    try {
      const { email, password } = data;
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        loggerApi.warn(`Пользователь уже существует: ${email}`);
        throw new Error("user existing");
      }
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const codeData = JSON.stringify({
        email,
        password: hashedPassword,
        code,
      });

      await redis.set(`register:${email}`, codeData, "EX", 60);
      loggerApi.info(
        `Пользователь ${email} добавлен в redis ожидает код: ${code}`
      );
    } catch (err) {
      throw err;
    }
  }
  static async verifRegister(data: VerifCodeInput, ip: string) {
    try {
      const { code, email } = data;
      const storedData = await redis.get(`register:${email}`);
      if (!storedData) {
        loggerApi.warn(`Код не найден или истек для ${email}`);
        throw new Error("code not found");
      }

      const { code: saveCode, password } = JSON.parse(storedData);
      if (code !== saveCode) {
        loggerApi.warn(`Код не подходит`);
        throw new Error("code declined");
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        loggerApi.warn(`Пользователь уже существует: ${email}`);
        throw new Error("user existing");
      }
      await prisma.user.create({
        data: {
          email,
          password, // пароль уже захеширован при сохранении в Redis
        },
      });
      await redis.del(`register:${email}`);
      loggerApi.info(`Верификация регистрации пройдена для ${ip}`);
      const textMessage = await registerMessage(email, password, ip);
      await sendMessage(textMessage);
    } catch (err) {
      loggerApi.error(
        `Ошибка пр верификаци код и добавления пользователя: ${err}`
      );
      throw err;
    }
  }

  static async refresh(data: RefreshInput) {
    try {
      const { refresh_token } = data;
      const payload = jwt.verify(refresh_token, REFRESH_TOKEN_SECRET);
      if (!payload) {
        loggerApi.warn(`Не валидный токен ${refresh_token}`);
        throw new Error(`Invalid refresh_token`);
      }
      const session = await prisma.sessions.findUnique({
        where: { refreshToken: refresh_token },
      });
      if (!session) {
        loggerApi.warn(`Токен не найден в бд ${refresh_token}`);
        throw new Error(`Refresh token not found`);
      }

      const newAccessToken = jwt.sign(
        { userId: payload.userId },
        ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
      );

      const newRefreshToken = jwt.sign(
        { userId: payload.userId },
        REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
      );

      await prisma.sessions.update({
        where: { id: session.id },
        data: {
          refreshToken: newRefreshToken,
          expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        },
      });

      loggerApi.info(`Токены обновлены`);
      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (err) {
      loggerApi.error(`Ошибка при обновлении токена: ${err}`);
      throw err;
    }
  }

  static async logout(data: RefreshInput) {
    try {
      const { refresh_token } = data;
      const session = await prisma.sessions.findUnique({
        where: { refreshToken: refresh_token },
      });
      if (!session) {
        loggerApi.warn(`Сессия не найдена для ${refresh_token}`);
        throw new Error("session not found");
      }
      await prisma.sessions.delete({
        where: { id: session.id },
      });
      loggerApi.info(`Сессия удалена: ${session.id}`);
    } catch (err) {
      loggerApi.error(`Ошибка при выходе пользователя: ${err}`);
      throw err;
    }
  }
}
