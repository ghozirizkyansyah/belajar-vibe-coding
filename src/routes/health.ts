import { Elysia } from "elysia";
import { poolConnection } from "../db";

export const healthRoutes = new Elysia({ prefix: "/health" })
  .get("/", () => ({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  }))
  .get("/db", async ({ set }) => {
    try {
      await poolConnection.query("SELECT 1");
      return {
        status: "ok",
        database: "connected",
      };
    } catch (error: any) {
      set.status = 503;
      return {
        status: "error",
        database: "disconnected",
        message: error.message,
      };
    }
  });

