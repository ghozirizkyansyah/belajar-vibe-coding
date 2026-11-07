import { Elysia } from "elysia";
import { healthRoutes } from "./routes/health";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({
    message: "Welcome to Elysia + Bun + Drizzle + MySQL API",
  }))
  .use(healthRoutes)
  .listen(port);

console.log(
  `🚀 Server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;

