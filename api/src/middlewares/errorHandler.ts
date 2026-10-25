import type { ErrorRequestHandler } from "express";
import { Prisma } from "../generated/prisma/client.js";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Prisma: record to update/delete does not exist
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
    return res.status(404).json({ error: "Not found" });
  }

  if (err.status && typeof err.status === "number") {
    return res.status(err.status).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
};
