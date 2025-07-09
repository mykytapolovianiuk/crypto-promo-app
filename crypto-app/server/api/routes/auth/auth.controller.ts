import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  refreshCookieSchema,
  userSchema,
  verifCodeSchema,
} from "../../../@types/auth";
import { AuthService } from "./auth.services";

const authRoutes = new Hono();

authRoutes
  .post("/login", zValidator("json", userSchema), async (c) => {
    try {
      const data = c.req.valid("json");
      const ip = c.req.header("x-forwarded-for") || "Неизвестен";

      const { access_token, refresh_token } = await AuthService.login(data, ip);
      c.header(
        "Set-Cookie",
        `refresh_token=${refresh_token}; HttpOnly; Path=/; Max-Age=1296000; SameSite=Strict`
      );
      return c.json({ access_token }, 200);
    } catch (err) {
      if (
        err.message === "user not found" ||
        err.message === "password decline"
      ) {
        return c.json({ message: "Unauthorized" }, 401);
      }
      return c.json({ message: `Ошибка логина` }, 500);
    }
  })
  .post("/create-reg", zValidator("json", userSchema), async (c) => {
    try {
      const data = c.req.valid("json");
      await AuthService.createRegister(data);
      return c.body(null, 204);
    } catch (err) {
      if (err.message === "user existing") {
        return c.json({ message: "Пользователь уже существует" }, 409);
      }
      return c.json({ message: "Ошибка регистарции" }, 500);
    }
  })
  .post("/verif-reg", zValidator("json", verifCodeSchema), async (c) => {
    try {
      const data = c.req.valid("json");
      const ip = c.req.header("x-forwarded-for") || "Неизвестен";
      await AuthService.verifRegister(data, ip);
      return c.body(null, 204);
    } catch (err) {
      if (err.message === "code not found") {
        return c.json({ message: "Code not found" }, 404);
      } else if (err.message === "code declined") {
        return c.json({ message: "Unauthorized" }, 401);
      } else if (err.message === "user existing") {
        return c.json({ message: "Пользователь уже существует" }, 409);
      }
      return c.json({ message: "Ошибка регистарции" }, 500);
    }
  })
  .post("/refresh", zValidator("cookie", refreshCookieSchema), async (c) => {
    try {
      const data = c.req.valid("cookie");
      const { access_token, refresh_token } = await AuthService.refresh(data);

      c.header(
        "Set-Cookie",
        `refresh_token=${refresh_token}; HttpOnly; Path=/; Max-Age=1296000; SameSite=Strict`
      );

      return c.json({ access_token }, 200);
    } catch (err) {
      return c.json({ message: "Ошибка обновления токена" }, 401);
    }
  })
  .post("/logout", zValidator("cookie", refreshCookieSchema), async (c) => {
    try {
      const data = c.req.valid("cookie");
      await AuthService.logout(data);
      return c.body(null, 204);
    } catch (err) {
      if (err.message === "session not found") {
        return c.json({ message: "Unauthorized" }, 401);
      }
      return c.json({ message: "Ошибка выхода" }, 500);
    }
  });

export default authRoutes;
