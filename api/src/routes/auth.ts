import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { requireAuth } from "../middlewares/auth.js";
import { loginBody, registerBody } from "../schemas/auth.js";
import * as authService from "../services/authService.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerBody), async (_req, res) => {
  const result = await authService.register(res.locals.body);
  res.status(201).json(result);
});

authRouter.post("/login", validate(loginBody), async (_req, res) => {
  const result = await authService.login(res.locals.body);
  res.json(result);
});

authRouter.get("/me", requireAuth, (_req, res) => {
  res.json({ user: res.locals.user });
});
