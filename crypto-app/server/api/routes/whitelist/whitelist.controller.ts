import { Hono } from "hono";
import { authMiddleware } from "../../middlewares/auth";

const whitelistRoutes = new Hono();

whitelistRoutes.use("*", authMiddleware);
whitelistRoutes
  .post("/connect", async (c) => {
    try {
    } catch (err) {}
  })
  .post("/verif", async (c) => {
    try {
    } catch (err) {}
  });

export default whitelistRoutes;
