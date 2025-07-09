import { Hono } from "hono";
import authRoutes from "./auth/auth.controller";
import whitelistRoutes from "./whitelist/whitelist.controller";

const router = new Hono();
router.route("/auth", authRoutes);
router.route("/whitelist", whitelistRoutes);

export default router;
