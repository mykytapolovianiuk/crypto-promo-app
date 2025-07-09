import { Hono } from "hono";
import { logger } from "hono/logger";
import { PORT } from "../lib/constants";
import { loggerApi } from "../lib/logger";
import router from "./routes";

const app = new Hono();

app.use("*", logger());
app.route("/api/v1", router);

app.get("/", (c) => c.text("API работает 🚀"));
app.get("/ping", (c) => c.json({ pong: true }));

export function startApiServer() {
  loggerApi.info(`Запуск на http://localhost:${PORT}`);
  return Bun.serve({
    port: PORT,
    hostname: "0.0.0.0",
    fetch: app.fetch,
  });
}
