import { MiddlewareHandler } from "hono";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../../lib/constants";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
      userId: number;
    };

    // Прокидываем userId в контекст
    c.set("userId", payload.userId);

    await next();
  } catch (err) {
    return c.json({ message: "Invalid or expired token" }, 401);
  }
};
