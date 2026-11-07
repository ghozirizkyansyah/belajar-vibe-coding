import { Elysia, t } from "elysia";
import { UserAlreadyExistsError, usersService } from "../services/users-service";

export const usersRoute = new Elysia({ prefix: "/api/users" }).post(
  "/",
  async ({ body, set }) => {
    try {
      const newUser = await usersService.register(body);

      set.status = 201;
      return {
        status: 201,
        message: "User created successfully",
        data: newUser,
      };
    } catch (error: any) {
      if (error instanceof UserAlreadyExistsError) {
        set.status = 400;
        return {
          status: 400,
          message: error.message,
        };
      }

      set.status = 500;
      return {
        status: 500,
        message: error.message || "Internal server error",
      };
    }
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1 }),
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 1 }),
    }),
  }
);

