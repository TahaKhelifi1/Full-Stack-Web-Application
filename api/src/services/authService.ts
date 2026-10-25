import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_key_123";

export async function register(data: { email: string; password: string; name?: string }) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    const error: any = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      name: data.name,
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
}

export async function login(data: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    const error: any = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
}
