import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface RegisterUserResult {
  name: string;
  email: string;
}

export class UserAlreadyExistsError extends Error {
  constructor(message = "User already exists") {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}

export const usersService = {
  async register(input: RegisterUserInput): Promise<RegisterUserResult> {
    // 1. Cek apakah user dengan email tersebut sudah terdaftar
    const existingUsers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, input.email))
      .limit(1);

    if (existingUsers.length > 0) {
      throw new UserAlreadyExistsError("User already exists");
    }

    // 2. Hash password menggunakan bcrypt bawaan Bun
    const hashedPassword = await Bun.password.hash(input.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    // 3. Simpan data user ke database
    await db.insert(users).values({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    // 4. Return data user tanpa password
    return {
      name: input.name,
      email: input.email,
    };
  },
};
